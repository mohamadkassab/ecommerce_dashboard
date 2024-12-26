import * as React from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import {
  TextField,
  Typography,
  FormControl,
  Autocomplete,
  Checkbox,
  ListItemText,
} from "@mui/material";

import {
  GridToolbarExport,
  GridToolbarQuickFilter,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridSlots,
} from "@mui/x-data-grid";

import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { StatusModel } from "@/models/StatusModel";
import {
  getAllCategoryNames,
  getAllTagNames,
} from "@/utils/redux/actions/setup";
import FieldLabel from "@/components/label/FieldLabel";
import ActionButtons from "@/components/button/ActionButtons";
import ImageUploader from "@/components/image/ImageUploader";
import ModalWrapper from "@/components/wrapper/ModalWrapper";
import CustomTextField from "@/components/field/CustomTextField";
import { FileTypeEnum } from "@/models/FileTypeEnum";
import { maxSize_5MB } from "@/utils/constants";
import { ProductContentModel } from "@/models/ProductContentModel";
import { createProductContent, getAllProductContents, getProductMedia, updateProduct, updateProductContent } from "@/utils/redux/actions/product";
import DataGridBox from "@/components/wrapper/DataGridBox";
import { ExecException } from "child_process";

// Start Dynamic components
interface rowProps extends ProductContentModel {}

const defaultValues = {
  shortDescription: "",
  longDescription: "",
  categories: [],
  tags: [],
  media: []
};

const ProductContentDataGrid = () => {
  const columnsDataGrid: GridColDef[] = [
    {
      field: "productId",
      headerName: "Product Id",
      type: "number",
      flex: 0.5,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    { field: "shortDescription", headerName: "Short Desc", flex: 1, align: "center", headerAlign: "center", editable: false },
    { field: "longDescription", headerName: "Long Desc", flex: 1, align: "center", headerAlign: "center", editable: false },
    { field: "weight", headerName: "Weight", type:"number", flex: 1, align: "center", headerAlign: "center", editable: false },
    { field: "shippingWeight", headerName: "Shipping Weight", type:"number", flex: 1, align: "center", headerAlign: "center", editable: false },
    { field: "minOrder", headerName: "Min Order", type:"number", flex: 1, align: "center", headerAlign: "center", editable: false },
    { field: "maxOrder", headerName: "Max Order", type:"number", flex: 1, align: "center", headerAlign: "center", editable: false },
    {
      field: "categories",
      headerName: "Categories",
      align: "center", 
      headerAlign: "center",
      flex: 1,
      renderCell: (params) => {
        const itemsDisplayed =
          params?.value?.map((item: string) => item).join(", ") ||
          "Empty";
        return <span>{itemsDisplayed}</span>;
      },
      editable: false
    },
    {
      field: "tags",
      headerName: "Tags",
      flex: 1,
      align: "center",
       headerAlign: "center",
      renderCell: (params) => {
        const itemsDisplayed =
          params?.value?.map((item: string) => item).join(", ") ||
          "Empty";
        return <span>{itemsDisplayed}</span>;
      },
      editable: false
    },
    {
      field: "updatedAt",
      headerName: "Updated At",
      type: "date",
      valueGetter: (params) => {
        return new Date(params);
      },
      flex: 1,
      align: "center",
      headerAlign: "center",
      editable: false,
    },

    { field: "updatedBy", headerName: "Updated By", flex: 1, align: "center", headerAlign: "center", editable: false },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.6,
      cellClassName: "actions",
      getActions: ({ row }) => {
        return [
          <GridActionsCellItem
            key={`3`}
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleUpdateClick(row)}
            color="inherit"
          />,
        ];
      },
      editable: false,
    },
  ];
  // End Dynamic components

  function EditToolbar() {
    const handleClickAddRecord = () => {
      setFormData(defaultValues);
      handleOpenCreate();
    };

    return (
      <GridToolbarContainer>
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClickAddRecord}
        >
          Add record
        </Button>
        <GridToolbarExport />
        <div style={{ marginLeft: "auto" }}>
          <GridToolbarQuickFilter />
          {/* <GridRowCount rowCount={5} visibleRowCount={1}/> */}
        </div>
      </GridToolbarContainer>
    );
  }

  const dispatch = useAppDispatch();
  const { allProductContents, allTagNames, allCategoryNames, allProductMedia } = useAppSelector((state: any) => state.reducer); // Dynamic component
  const [filesLen, setFilesLen] = React.useState(0);
  const [areMediaChanged, setAreMediaChanged] = React.useState(false);
  const [currentFileIndex, setCurrentFileIndex] = React.useState(0);
  const [imagePreview, setImagePreview] = React.useState<string | null>(null);
  const [openCreate, setOpenCreate] = React.useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [formData, setFormData] = React.useState<rowProps>(defaultValues);
  const [refresh, setRefresh] = React.useState(false);
  const { status } = useAppSelector((state: any) => state.reducer);
  const [loading, setLoading] = React.useState(false);
  const handleOpenCreate = () => {
    setCurrentFileIndex(0);
    setFilesLen(0);
    setIsFormSubmitted(false);
    setImagePreview(null);
    setOpenCreate(true);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false)
  };
  const handleOpenEdit = () => {
    setIsFormSubmitted(false);
    setOpenEdit(true);
  };
  const handleCloseEdit = () => setOpenEdit(false);

  const handleCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createProductContent(formData)); // Dynamic component
    handleCloseCreate();
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const updatedFormData = !areMediaChanged
    ? { ...formData, media: null }
    : formData;
    dispatch(updateProductContent(updatedFormData)); // Dynamic component
    handleCloseEdit();
  };

  const handleUpdateClick = (row: rowProps) => () => {
    setImagePreview(null);
    dispatch(getProductMedia(Number(row?.productId))); 
    setFormData(row);
    handleOpenEdit();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleArrayChange = (key: string, newValue: any) => {
    if (Array.isArray(newValue)) {
      setFormData((prevState) => ({
        ...prevState,
        [`${key}`]: newValue,
      }));
    }
  };
  const next = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(currentFileIndex + 1 < filesLen){
      setCurrentFileIndex(currentFileIndex + 1);
      const filesInFormData = formData.media[currentFileIndex + 1];
      if(filesInFormData){
        let previewUrl;
        try{
          previewUrl = URL.createObjectURL(filesInFormData);
          setImagePreview(previewUrl);
        }catch(e){
          setImagePreview(`data:image/jpeg;base64,${filesInFormData}`);
        }
      } 
    }
  }
  const previous = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(currentFileIndex - 1 >= 0){
      setCurrentFileIndex(currentFileIndex - 1);
      const filesInFormData = formData.media[currentFileIndex - 1];
      if(filesInFormData){
        let previewUrl;
        try{
          previewUrl = URL.createObjectURL(filesInFormData);
          setImagePreview(previewUrl);
        }catch(e){
          setImagePreview(`data:image/jpeg;base64,${filesInFormData}`);
        }
      } 
    }
  }
  const handleChangeFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files= e.target.files;
    if (!files) {
      return;
    }
    if (files.length === 0) {
      return;
    }
    for (const file of Array.from(files)) {
      if (file.size > maxSize_5MB) {
        return;
      }
    }
    setAreMediaChanged(true);
    setFilesLen(files.length);
    const previewUrl = URL.createObjectURL(files[0]);
    setCurrentFileIndex(0);
    setImagePreview(previewUrl);

    setFormData((prev: any) => {
      return {
        ...prev,
        media: files,
      };
    });
  };

  // Dynamic Component
  React.useEffect(() =>{
    if(allProductMedia){
      setFormData((prev: any) => ({
        ...prev,
        media: allProductMedia,
      }));
      setCurrentFileIndex(0);
      setFilesLen(allProductMedia?.length);
      setImagePreview(`data:image/jpeg;base64,${allProductMedia[0]}`);
    }
  }, [allProductMedia])

  React.useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  React.useEffect(() => {
    if (status === StatusModel.SKELETONLOADING) {
      if (loading !== true) {
        setLoading(true);
      }
    } else {
      setLoading(false);
    }
  }, [status]);

  React.useEffect(() => {
    if (status === StatusModel.SUCCESS) {
      setRefresh(!refresh);
    }
  }, [status]);

  // Start Dynamic components
  React.useEffect(() => {
    dispatch(getAllProductContents()); // Dynamic component
    dispatch(getAllCategoryNames()); // Dynamic component
    dispatch(getAllTagNames()); // Dynamic component
  }, [refresh]);

  const columnsForms = [
    {
      field: "productId",
      caption: "Product Id",
      type: "number",
      required: true,
      value: formData?.productId,
      onChange: handleChange,
      inputProps:{
        inputMode: 'numeric', 
        pattern: '[0-9]*',   
        maxLength: 9,         
      },
      showOnCreate: true,
      showOnEdit: false,
    },
    {
      field: "shortDescription",
      caption: "Short Desc",
      type: "text",
      required: true,
      value: formData?.shortDescription,
      onChange: handleChange,
      inputProps: {
        maxLength: 255,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "longDescription",
      caption: "Long Desc",
      type: "text",
      required: true,
      value: formData?.longDescription,
      onChange: handleChange,
      inputProps: {
        maxLength: 16000,
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "weight",
      caption: "Weight",
      type: "number",
      required: true,
      value: formData?.weight,
      onChange: handleChange,
      inputProps:{
        inputMode: 'decimal',  
        maxLength: 6,         
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "shippingWeight",
      caption: "Shipping Weight",
      type: "number",
      required: true,
      value: formData?.shippingWeight,
      onChange: handleChange,
      inputProps:{
        inputMode: 'decimal',  
        maxLength: 6,         
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "minOrder",
      caption: "Min Order",
      type: "number",
      required: true,
      value: formData?.minOrder,
      onChange: handleChange,
      inputProps:{
        inputMode: 'numeric', 
        pattern: '[0-9]*',   
        maxLength: 4,         
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      field: "maxOrder",
      caption: "Max Order",
      type: "number",
      required: true,
      value: formData?.maxOrder,
      onChange: handleChange,
      inputProps:{
        inputMode: 'numeric', 
        pattern: '[0-9]*',   
        maxLength: 4,         
      },
      showOnCreate: true,
      showOnEdit: true,
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-categories`} fullWidth>
          <FieldLabel caption="Select Categories" htmlFor="categories"></FieldLabel>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={allCategoryNames || []}
            getOptionLabel={(option) => option}
            value={formData?.categories}
            onChange={(event, newValue) => {
              handleArrayChange("categories", newValue);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <ListItemText primary={option} />
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField 
              {...params} 
              variant="outlined" 
              required={!formData?.categories?.length} 
              />
            )}
            freeSolo={false}
          />
        </FormControl>
      ),
    },
    {
      showOnCreate: true,
      showOnEdit: true,
      component: (
        <FormControl key={`form-tags`} fullWidth>
          <FieldLabel caption="Select Tags" htmlFor="tag"></FieldLabel>
          <Autocomplete
            multiple
            disableCloseOnSelect
            options={allTagNames || []}
            getOptionLabel={(option) => option}
            value={formData?.tags}
            onChange={(event, newValue) => {
              handleArrayChange("tags", newValue);
            }}
            isOptionEqualToValue={(option, value) => option === value}
            renderOption={(props, option, { selected }) => {
              return (
                <li {...props}>
                  <Checkbox checked={selected} />
                  <ListItemText primary={option} />
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField 
              {...params} 
              variant="outlined" 
              required={!formData?.tags?.length} 
              />
            )}
            freeSolo={false}
          />
        </FormControl>
      ),
    },
  ];
  // End Dynamic components

  return (
    <DataGridBox>
      <Typography variant="h4" sx={{ textAlign: "center", width: "100%" }}>
        Product Content
      </Typography>
      <DataGrid
        rows={allProductContents} // Start Dynamic components
        columns={columnsDataGrid}
        disableRowSelectionOnClick
        loading={loading}
        getRowId={(row) => row.productId}
        slots={{
          toolbar: EditToolbar as GridSlots["toolbar"],
        }}
        slotProps={{
          loadingOverlay: {
            variant: "skeleton",
            noRowsVariant: "skeleton",
          },
        }}
        sx={{
          mt: 1,
          "& .MuiDataGrid-columnHeaders": {
            borderBottom: "2px solid",
            borderColor: "primary.main",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontWeight: "bold",
          },
        }}
      />

      <ModalWrapper
        open={openCreate}
        handleClose={handleCloseCreate}
        title="New Entry"
        mdWidth="1000px"
      >
        <form onSubmit={handleCreate}>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col w-full">
              {columnsForms.map((item, index) => {
                if (item?.showOnCreate) {
                  if (item?.component !== undefined) {
                    return item.component;
                  }
                  return <CustomTextField key={`create-${item?.field}-${index}`} item={item}/>;
                }
              })}

              <ActionButtons
                onCancel={handleCloseCreate}
                onSubmit={() => setIsFormSubmitted(true)}
                cancelLabel="Go Back"
                submitLabel="Save"
              />
            </div>

            <ImageUploader
              imagePreview={imagePreview}
              onChange={handleChangeFiles}
              required={formData?.media?.length < 1}
              isFormSubmitted={isFormSubmitted}
              fileType={FileTypeEnum.ImageVideo}
              errorMessage={`Media is required & less then ${(maxSize_5MB / 1000000).toFixed(0)} MB`}
              label="Choose Media"
              isMultiple={true}
              next={next}
              previous={previous}
              fileLen={filesLen}
              currentFileIndex={currentFileIndex}

            />
          </div>
        </form>
      </ModalWrapper>

      <ModalWrapper
        open={openEdit}
        handleClose={handleCloseEdit}
        title="Edit Entry"
        mdWidth="1000px"
      >
        <form onSubmit={handleUpdate}>
          <div className="flex gap-6 justify-center">
            <div className="flex flex-col w-full">
              {columnsForms.map((item, index) => {
                if (item?.showOnEdit) {
                  if (item?.component !== undefined) {
                    return item.component;
                  }
                  return <CustomTextField key={`edit-${item?.field}-${index}`} item={item}/>;
                }
              })}

              <ActionButtons
                onCancel={handleCloseEdit}
                onSubmit={() => setIsFormSubmitted(true)}
                cancelLabel="Go Back"
                submitLabel="Save"
              />
            </div>

            <ImageUploader
              imagePreview={imagePreview}
              onChange={handleChangeFiles}
              required={formData?.media?.length < 1}
              isFormSubmitted={isFormSubmitted}
              fileType={FileTypeEnum.ImageVideo}
              errorMessage={`Media is required & less then ${(maxSize_5MB / 1000000).toFixed(0)} MB`}
              label="Choose Media"
              isMultiple={true}
              next={next}
              previous={previous}
              fileLen={filesLen}
              currentFileIndex={currentFileIndex}
            />
          </div>
        </form>
      </ModalWrapper>
    </DataGridBox>
  );
};

export default ProductContentDataGrid;
