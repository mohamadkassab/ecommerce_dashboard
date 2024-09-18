import * as React from "react";
import PrimaryButton from "../button/PrimaryButton";
import HorizontalBarChart from "../chart/HorizontalBarChart";
import ChartWrapper from "../wrapper/chartWrapper";
import { createChart } from "@/utils/redux/actions/kpi";
import { useAppDispatch } from "@/utils/redux/hooks";
import HorizontalBarChartStatic from "../chart_static/HorizontalBarChartStatic";
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

interface FormData {
  label: string;
  key: string;
  numberOfOptions: number;
  query: string;
}

const HorizontalBarChartCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<DataPoint[]>([]);
  const [formData, setFormData] = React.useState<FormData>({
    label: "",
    key: "key",
    numberOfOptions: 0,
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

  type DataPoint = {
    [key: string]: number | string;
  };

  React.useEffect(() => {
    const data: DataPoint[] = [];
    for (let i = 1; i < 12; i++) {
      const dataPoint: DataPoint = {};

      dataPoint[formData.key] = `${formData.key} ${i}`;

      for (let j = 1; j <= formData.numberOfOptions; j++) {
        const otherKey = `option ${j}`;
        dataPoint[otherKey] = Math.floor(Math.random() * 10);
      }

      data.push(dataPoint);
    }

    setData(data);
  }, [formData.numberOfOptions, formData.key]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createChart({
        label: formData.label,
        query: formData.query,
        chartType: "HorizontalBarChart",
        chartProperties: [
          {
            propertyName: "numberOfOptions",
            propertyValue: formData.numberOfOptions.toString(),
          },
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
          type="number"
          label="Number of options"
          variant="outlined"
          margin="normal"
          name="numberOfOptions"
          sx={{ width: "50%" }}
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
                * SQL result should have a column with name "key" wich represents yaxis values<br />
                * Example: <br />
                
              
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>key</TableCell>
                      <TableCell>beirut</TableCell>
                      <TableCell>tyre</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Jan</TableCell>
                      <TableCell>140</TableCell>
                      <TableCell>33</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Feb</TableCell>
                      <TableCell>50</TableCell>
                      <TableCell>24</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Mar</TableCell>
                      <TableCell>24</TableCell>
                      <TableCell>51</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
        </p>
      </form>

      <ChartWrapper width={500} height={550} label={""}>
        <HorizontalBarChartStatic
          dataset={data}
          initialSelectedOption={`option 1`}
          dataKey={"key"}
          label={formData["label"]}
        />
      </ChartWrapper>
    </div>
  );
};

export default HorizontalBarChartCreate;
