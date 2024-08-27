"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import VerticalBarChart from "@/components/chart/VerticalBarChart";
import HorizontalBarChart from "@/components/chart/HorizontalBarChart";
import BiaxialLineChart from "@/components/chart/BiaxialLineChart";
import PieActiveArc from "@/components/chart/PieActiveArc";
import ArcDesign from "@/components/chart/ArcDesign";
import BasicColorLegend from "@/components/chart/BasicColorLegend";
import TopN from "@/components/chart/TopN";
import ChartButtonWrapper from "../../../../components/wrapper/ChartButtonWrapper";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Grid from "@mui/material/Unstable_Grid2";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PrimaryButton from "@/components/button/PrimaryButton";
import VerticalBarChartCreate from "@/components/chart_create/VerticalBarChartCreate";
import HorizontalBarChartCreate from "@/components/chart_create/HorizontalBarChartCreate";
import { DUMMYDATA } from "@/utils/constants";
import BiaxialLineChartCreate from "@/components/chart_create/BiaxialLineChartCreate";
import PieActiveArcCreate from "@/components/chart_create/PieActiveArcCreate";
import ArcDesignCreate from "@/components/chart_create/ArcDesignCreate";
import TopNCreate from "@/components/chart_create/TopNCreate";
import BasicColorLegendCreate from "@/components/chart_create/BasicColorLegendCreate";





const KpiAddPage = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  type ChartComponentNode = React.ReactNode;

  const [selectedChartNode, setSelectedChartNode] =
    useState<ChartComponentNode | null>(null);
  const [isFirstPage, setIsFirstPage] = useState<boolean>(true);

  const selectChart = (component: string) => {
    updateSelectedChartNode(component);
  };

  const updateSelectedChartNode = (component: string) => {
    if (component) {
      setIsFirstPage(false);

      const chartComponents: { [key: string]: JSX.Element } = {
        VerticalBarChart: <VerticalBarChartCreate />,
        HorizontalBarChart: <HorizontalBarChartCreate />,
        BiaxialLineChart: <BiaxialLineChartCreate/>,
        PieActiveArc: <PieActiveArcCreate/>,
        ArcDesign: <ArcDesignCreate />,
        TopN: <TopNCreate />,
        BasicColorLegend: <BasicColorLegendCreate />,
      };

      setSelectedChartNode(chartComponents[component] || null);
    }
  };

  return (
    <Box className="max-w-full flex flex-col justify-center items-center max-h-full  pb-[6rem]">
      <Box className="w-full flex justify-between ">
        <div>
          {!isFirstPage && (
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIosIcon />}
              onClick={() => {
                setIsFirstPage(true);
              }}
            >
              Back
            </Button>
          )}
        </div>
        <Typography variant="h4">Add Kpi</Typography>
        <div></div>
      </Box>

      {isFirstPage ? (
        <Box className="w-full flex justify-center mt-[4rem]">
          <Box
            className="w-full flex flex-wrap justify-center items-center gap-y-[4rem] "
          >
            <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center">
              <Card
                sx={{
                  width: 500,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                  Vertical Bar Chart
                  </Typography>
                  <VerticalBarChart
                    xAxisData={DUMMYDATA["VerticalBarChart"]["xAxisData"]}
                    seriesData={DUMMYDATA["VerticalBarChart"]["seriesData"]}
                    label="Example chart"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() => selectChart("VerticalBarChart")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Box>

            <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center ">
              <Card
                sx={{
                  width: 500,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <HorizontalBarChart
                    dataset={DUMMYDATA["HorizontalBarChart"]["dataset"]}
                    initialSelectedOption="london"
                    xaxisLabel="X Axis Label"
                    dataKey="month"
                    label="Horizontal Bar Chart"
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() => selectChart("HorizontalBarChart")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Box>

            <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center">
              <Card
                sx={{
                  width: 500,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                  Biaxial Line Chart
                  </Typography>
                  <BiaxialLineChart years={DUMMYDATA["BiaxialLineChart"]["years"]} series={[
    {
      label: 'French GDP',
      data: DUMMYDATA["BiaxialLineChart"]["FranceGDPperCapita"],
      showMark: false,
    },
    {
      label: 'German GDP',
      data: DUMMYDATA["BiaxialLineChart"]["GermanyGDPperCapita"],
      showMark: false,
    },
    {
      label: 'UK GDP per',
      data: DUMMYDATA["BiaxialLineChart"]["UKGDPperCapita"],
      showMark: false,
    },
    
  ]} />
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() => selectChart("BiaxialLineChart")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Box>

            <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center">
              <Card
                sx={{
                  width: 500,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                  Pie Active Arc
                  </Typography>
                  <PieActiveArc data={DUMMYDATA["PieActiveArc"]["data"]}/>
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() => selectChart("PieActiveArc")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Box>

            <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center">
              <Card
                sx={{
                  width:500,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                  Arc Design
                  </Typography>
                  <ArcDesign value={10} />
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() => selectChart("ArcDesign")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Box>

            <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center">
              <Card
                sx={{
                  width:500,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                  Top N
                  </Typography>
                  <TopN items={DUMMYDATA["TopN"]["items"]}/>
                </CardContent>
                <CardActions>
                  <Button size="medium" onClick={() => selectChart("TopN")}>
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Box>

            <Box className="w-full  flex justify-center">
              <Card
                sx={{
                  width: 1000,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    Basic Color Legend
                  </Typography>
                  <BasicColorLegend dataset={DUMMYDATA["BasicColorLegend"]["dataset"]} lowMargin={-0.5} highMargin={0} />
                </CardContent>
                <CardActions>
                  <Button
                    size="medium"
                    onClick={() => selectChart("BasicColorLegend")}
                  >
                    Select
                  </Button>
                </CardActions>
              </Card>
            </Box>

            
          </Box>
        </Box>
      ) : (
        selectedChartNode
      )}
    </Box>
  );
};

export default KpiAddPage;
