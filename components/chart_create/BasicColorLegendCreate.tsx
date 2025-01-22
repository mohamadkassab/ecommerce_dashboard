import * as React from "react";
import PrimaryButton from "../button/PrimaryButton";
import BasicColorLegend from "../chart/BasicColorLegend";
import { DUMMYDATA } from "@/utils/constants";
import BasicColorLegendStatic from "../chart_static/BasicColorLegendStatic";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { CreateChart } from "@/utils/redux/actions/kpi";
import {
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography
} from "@mui/material";
import { StatusModel } from "@/models/StatusModel";

interface FormData {
  label: string;
  lowMargin: number;
  highMargin: number;
  query: string;
}

const defaultFormData = {
  label: "",
  lowMargin: 0,
  highMargin: 0,
  query: "",
}

const BasicColorLegendCreate: React.FC = () => {
  const { status } = useAppSelector((state: any) => state.reducer);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState<FormData>(defaultFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type  } = event.target;

    const parsedValue =
      type === "date"
        ? new Date(value)
        : type === "number" && !isNaN(parseFloat(value))
        ? parseFloat(value)
        : value;

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      CreateChart({
        label: formData.label,
        query: formData.query,
        chartType: "BasicColorLegend",
        chartProperties: [
          {
            propertyName: "lowMargin",
            propertyValue: formData.lowMargin.toString(),
          },
          {
            propertyName: "highMargin",
            propertyValue: formData.highMargin.toString(),
          },
        ],
      })
    );
  };

  React.useEffect(()=>{
    if(status === StatusModel.SUCCESS){
      setFormData(defaultFormData);
    }
  },[status])

  return (
    <div className="flex flex-wrap w-full mt-[4rem] ">
      <form onSubmit={handleSubmit} className=" w-full lg:w-1/3 flex flex-col justify-start items-center">
        <TextField
          required
          type="text"
          label="Label"
          variant="outlined"
          margin="normal"
          name="label" 
          sx={{ width: "50%" }}
          inputProps={{ maxLength: 89 }}
          value={formData.label}
          onChange={handleChange}
        />
        <TextField
          required
          helperText="Low margin"
          type="number"
          variant="outlined"
          margin="normal"
          name="lowMargin" 
          sx={{ width: "50%" }}
          inputProps={{ step: "0.01" }}
          value={formData.lowMargin}
          onChange={handleChange}
          // onChange={(e) => handleChange(parseFloat(e.target.value))} 

        />
        <TextField
          required
          helperText="High margin"
          type="number"
          variant="outlined"
          margin="normal"
          name="highMargin" 
          sx={{ width: "50%" }}
          inputProps={{ step: "0.01" }}
          value={formData.highMargin}
          onChange={handleChange}
        />
        <TextField
          required
          type="text"
          multiline
          rows={10}
          label="SQL Query"
          variant="outlined"
          margin="normal"
          name="query" 
          sx={{ width: "50%" }}
          value={formData.query}
          onChange={handleChange}
          inputProps={{ spellCheck: false }}
        />
        <PrimaryButton width={"50%"} type="submit" >
          ADD
        </PrimaryButton>
        <p className="mt-[2rem] px-[4rem]">
              <Typography variant="body2">
                SQL QUERY RULES: <br />
                * SQL result should have a column with name |date_key| wich represenets the xaxis, the data should be as type Date <br />
                * SQL result should have a column with name |value| wich represenets the yaxis values <br />
                * Example: <br />
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>date_key</TableCell>
                      <TableCell>value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>2020-01-01 00:00:00</TableCell>
                      <TableCell>140</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2021-01-01 00:00:00</TableCell>
                      <TableCell>50</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>2022-01-01 00:00:00</TableCell>
                      <TableCell>24</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </p>
      </form>
      <Box className="w-full lg:w-2/3  flex justify-start items-center">
        <Card
          sx={{
            width: 850,
            height: 500,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography variant="h6" component="div" gutterBottom>
              {formData["label"]}
            </Typography>
            <BasicColorLegendStatic
              dataset={DUMMYDATA["BasicColorLegend"]["dataset"]}
              lowMargin={formData["lowMargin"]}
              highMargin={formData["highMargin"]}
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default BasicColorLegendCreate;
