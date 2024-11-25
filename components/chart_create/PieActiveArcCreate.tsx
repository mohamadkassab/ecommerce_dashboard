import * as React from "react";
import PrimaryButton from "../button/PrimaryButton";
import PieActiveArc from "../chart/PieActiveArc";
import ChartWrapper from "../wrapper/chartWrapper";
import PieActiveArcStatic from "../chart_static/PieActiveArcStatic";
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
  Typography
} from "@mui/material";
import { StatusModel } from "@/models/StatusModel";

interface FormData {
  label: string;
  numberOfGroups: number;
  query: string;
}

type DataItem = {
  id: number;
  value: number;
  label: string;
};

const defaultFormData = {
  label: "",
  numberOfGroups: 0,
  query: "",
}


const PieActiveArcCreate: React.FC = () => {
  const { status } = useAppSelector((state: any) => state.reducer);
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<DataItem[]>([]);

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

  const generateSeriesData = (groupCount: number) => {
    const neData = [];
    for (let i = 0; i < groupCount; i++) {
      neData.push({
        id: Number(`${i + 1}`),
        value: Math.random() * 30,
        label: `Option ${i + 1}`,
      });
    }
    return neData;
  };

  React.useEffect(() => {
    const newData = generateSeriesData(formData["numberOfGroups"]);
    setData(newData);
  }, [formData["numberOfGroups"]]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(
      createChart({
        label: formData.label,
        query: formData.query,
        chartType: "PieActiveArc",
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
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2 flex flex-col justify-start items-center">
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
                * SQL result should return one row, the columns should have the names of the groups <br />
              </Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>tyre</TableCell>
                      <TableCell>beirut</TableCell>
                      <TableCell>tripoli</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>25</TableCell>
                      <TableCell>54</TableCell>
                      <TableCell>33</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
        </p>
      </form>

      <ChartWrapper width={500} height={500} label={"Pie Active Arc"}>
        <PieActiveArcStatic data={data} />
      </ChartWrapper>
    </div>
  );
};

export default PieActiveArcCreate;
