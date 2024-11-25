import * as React from "react";
import PrimaryButton from "../button/PrimaryButton";
import BiaxialLineChart from "../chart/BiaxialLineChart";
import { DUMMYDATA } from "@/utils/constants";
import ChartWrapper from "../wrapper/chartWrapper";
import BiaxialLineChartStatic from "../chart_static/BiaxialLineChartStatic";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { createChart } from "@/utils/redux/actions/kpi";
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
import { StatusModel } from "@/models/StatusModel";

interface FormData {
  label: string;
  numberOfGroups: number;
  xAxisKey: string;
  query: string;
}

type seriesProps = {
  label: string;
  data: number[];
  showMark: boolean;
};

const defaultFormData = {
  label: "",
  numberOfGroups: 0,
  xAxisKey: "",
  query: "",
}

const BiaxialLineChartCreate: React.FC = () => {
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

  const [series, setSeries] = React.useState<seriesProps[]>([]);
  const generateSeriesData = (groupCount: number) => {
    const newSeries = [];
    for (let i = 0; i < groupCount; i++) {
      newSeries.push({
        label: `Option ${i + 1}`,
        data: Array.from({ length: 29 }, () => Math.random() * 30),
        showMark: false,
      });
    }
    return newSeries;
  };

  React.useEffect(() => {
    const newSeries = generateSeriesData(formData["numberOfGroups"]);
    setSeries(newSeries);
  }, [formData["numberOfGroups"]]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createChart({
        label: formData.label,
        query: formData.query,
        chartType: "BiaxialLineChart",
        chartProperties: [
          {
            propertyName: "numberOfGroups",
            propertyValue: formData.numberOfGroups.toString(),
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
          value={formData.label}
          onChange={handleChange}
        />

        <TextField
          required
          type="number"
          label="Number of groups"
          variant="outlined"
          margin="normal"
          name="numberOfGroups"
          sx={{ width: "50%" }}
          value={formData.numberOfGroups}
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
        <PrimaryButton width={"50%"} type="submit">
          ADD
        </PrimaryButton>
        <p className="mt-[2rem]">
          <Typography variant="body2">
            SQL QUERY RULES: <br />
            * SQL result should have a column with name |date_key| wich
            represenets the xaxis, the data should be as type Date <br />
            * Example: <br />
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>date_key</TableCell>
                  <TableCell>beirut</TableCell>
                  <TableCell>tyre</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>2020-01-01 00:00:00</TableCell>
                  <TableCell>140</TableCell>
                  <TableCell>33</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2021-01-01 00:00:00</TableCell>
                  <TableCell>50</TableCell>
                  <TableCell>24</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>2022-01-01 00:00:00</TableCell>
                  <TableCell>24</TableCell>
                  <TableCell>51</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </p>
      </form>

      <ChartWrapper width={500} height={500} label={"Biaxial Line Chart"}>
        <BiaxialLineChartStatic
          years={DUMMYDATA["BiaxialLineChart"]["years"]}
          series={series}
        />
      </ChartWrapper>
    </div>
  );
};

export default BiaxialLineChartCreate;
