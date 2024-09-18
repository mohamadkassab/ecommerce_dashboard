import * as React from "react";
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
  Typography,
} from "@mui/material";
import PrimaryButton from "../button/PrimaryButton";
import VerticalBarChart from "../chart/VerticalBarChart";
import { useAppDispatch } from "@/utils/redux/hooks";
import { createChart } from "@/utils/redux/actions/kpi";
import ChartWrapper from "../wrapper/chartWrapper";
import VerticalBarChartStatic from "../chart_static/VerticalBarChartStatic";

interface FormData {
  label: string;
  query: string;
}

const VerticalBarChartCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = React.useState<FormData>({
    label: "",
    query: "",
  });

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
        chartType: "VerticalBarChart",
        chartProperties: [

        ],
      })
    );
  };



  return (
    <div className="flex flex-wrap w-full mt-[4rem] gap-[1rem]">
      <form
        onSubmit={handleSubmit}
        className="w-full lg:w-1/2 flex flex-col justify-start items-center"
      >
        <TextField
          required
          type="text"
          label="Label"
          variant="outlined"
          margin="normal"
          name="label"
          sx={{ width: "50%" }}
          inputProps={{ maxLength: 89 }}
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
          onChange={handleChange}
          inputProps={{ spellCheck: false }}
   
        />
        <PrimaryButton width={"50%"} type="submit">
          ADD
        </PrimaryButton>
        <p className="mt-[2rem]">
              <Typography variant="body2">
                SQL QUERY RULES: <br />
                * First column's name should be &quot;group_name&quot; <br />
                * Each group can only have one row of data <br />
                * Example: <br />
              </Typography>

              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>group_name</TableCell>
                      <TableCell>total_sales</TableCell>
                      <TableCell>total_payments</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Group_1</TableCell>
                      <TableCell>140</TableCell>
                      <TableCell>84</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Group_2</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>31</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Group_3</TableCell>
                      <TableCell>24</TableCell>
                      <TableCell>5</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </p>
      </form>

      <ChartWrapper width={500} height={550} label={formData.label}>
        <VerticalBarChart chart={formData} />
      </ChartWrapper>
    </div>
  );
};

export default VerticalBarChartCreate;
