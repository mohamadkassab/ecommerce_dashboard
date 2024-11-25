/* eslint-disable react/no-unescaped-entities */
import * as React from "react";
import PrimaryButton from "../button/PrimaryButton";
import { DUMMYDATA } from "@/utils/constants";
import TopN from "../chart/TopN";
import ChartWrapper from "../wrapper/chartWrapper";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { createChart } from "@/utils/redux/actions/kpi";
import TopNStatic from "../chart_static/TopNStatic";
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
  query: string;
}

const defaultFormData = {
  label: "",
  query: "",
}

const TopNCreate: React.FC = () => {
  const { status } = useAppSelector((state: any) => state.reducer);
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState<FormData>(defaultFormData);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    const parsedValue =
      isNaN(parseFloat(value)) || value.trim() === ""
        ? value
        : parseFloat(value);

    setFormData({
      ...formData,
      [name]: parsedValue,
    });
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createChart({
        label: formData.label,
        query: formData.query,
        chartType: "TopN",
        chartProperties: [],
      })
    );
  };

  React.useEffect(()=>{
    if(status === StatusModel.SUCCESS){
      setFormData(defaultFormData);
    }
  },[status])

  return (
    <div className="flex flex-wrap w-full mt-[4rem] gap-[1rem]">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col justify-start items-center">
        <TextField
          required
          type="text"
          label="Label"
          variant="outlined"
          margin="normal"
          name="label" // Use name attribute to identify the field
          sx={{ width: "50%" }}
          value={formData.label}
          onChange={handleChange}
          inputProps={{ maxLength: 89 }}
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
          inputProps={{ spellCheck: false }}
          value={formData.query}
          onChange={handleChange}

        />
        <PrimaryButton width={"50%"} type="submit">
          ADD
        </PrimaryButton>
        <p className="mt-[2rem]">
        <Typography variant="body2">
                SQL QUERY RULES: <br />
                * SQL result should return two columns with names "value" and "key"<br />
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>key</TableCell>
                      <TableCell>value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Nov</TableCell>
                      <TableCell>54</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Aug</TableCell>
                      <TableCell>65</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Jan</TableCell>
                      <TableCell>51</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
        </p>
      </form>
      <ChartWrapper width={500} height={550} label={"Top N"}>
        <TopNStatic items={DUMMYDATA["TopN"]["items"]} />
      </ChartWrapper>
    </div>
  );
};

export default TopNCreate;
