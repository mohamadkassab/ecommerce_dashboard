import * as React from "react";
import { Box, Card, CardContent, TextField, Typography } from "@mui/material";
import PrimaryButton from "../button/PrimaryButton";
import ArcDesign from "../chart/ArcDesign";
import ChartWrapper from "../wrapper/chartWrapper";
import { useAppDispatch } from "@/utils/redux/hooks";
import { createChart } from "@/utils/redux/actions/kpi";
import ArcDesignStatic from "../chart_static/ArcDesignStatic";

interface FormData {
  label: string;
  query: string;
}

const ArcDesignCreate: React.FC = () => {
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
        chartType: "ArcDesign",
        chartProperties: [],
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
          name="label" // Use name attribute to identify the field
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
                * SQL result should return one number value <br />
              </Typography>
        </p>
      </form>
      <ChartWrapper width={500} height={500} label={formData.label}>
        <ArcDesignStatic value={10.5} />
      </ChartWrapper>
    </div>
  );
};

export default ArcDesignCreate;
