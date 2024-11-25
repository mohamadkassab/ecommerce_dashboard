"use client";
import React, {useEffect, useState } from "react";
import { Box, Card, CardActions, CardContent, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { styled } from "@mui/material/styles";
import { DUMMYDATA } from "@/utils/constants";
import Paper from "@mui/material/Paper";
import dynamic from "next/dynamic";
import LoadingPlaceholder from "@/components/shared/LoadingPlaceholder";
import { useRouter } from "next/navigation";
import ChartWrapper from "@/components/wrapper/chartWrapper";
import VerticalBarChartStatic from "@/components/chart_static/VerticalBarChartStatic";
import HorizontalBarChartStatic from "@/components/chart_static/HorizontalBarChartStatic";
import BiaxialLineChartStatic from "@/components/chart_static/BiaxialLineChartStatic";
import PieActiveArcStatic from "@/components/chart_static/PieActiveArcStatic";
import ArcDesignStatic from "@/components/chart_static/ArcDesignStatic";
import TopNStatic from "@/components/chart_static/TopNStatic";
import BasicColorLegendStatic from "@/components/chart_static/BasicColorLegendStatic";

const VerticalBarChartCreate = dynamic(
  () => import("@/components/chart_create/VerticalBarChartCreate"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const HorizontalBarChartCreate = dynamic(
  () => import("@/components/chart_create/HorizontalBarChartCreate"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const BiaxialLineChartCreate = dynamic(
  () => import("@/components/chart_create/BiaxialLineChartCreate"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const PieActiveArcCreate = dynamic(
  () => import("@/components/chart_create/PieActiveArcCreate"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const ArcDesignCreate = dynamic(
  () => import("@/components/chart_create/ArcDesignCreate"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const TopNCreate = dynamic(
  () => import("@/components/chart_create/TopNCreate"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);
const BasicColorLegendCreate = dynamic(
  () => import("@/components/chart_create/BasicColorLegendCreate"),
  {
    ssr: false,
    loading: () => <LoadingPlaceholder />,
  }
);

const chartComponents: { [key: string]: JSX.Element } = {
  VerticalBarChart: <VerticalBarChartCreate />,
  HorizontalBarChart: <HorizontalBarChartCreate />,
  BiaxialLineChart: <BiaxialLineChartCreate />,
  PieActiveArc: <PieActiveArcCreate />,
  ArcDesign: <ArcDesignCreate />,
  TopN: <TopNCreate />,
  BasicColorLegend: <BasicColorLegendCreate />,
};

const KpiAddPage = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  //   padding: theme.spacing(1),
  //   textAlign: "center",
  //   color: theme.palette.text.secondary,
  // }));

  
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

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
      setSelectedChartNode(chartComponents[component] || null);
    }
  };

  
  return (
    <Box className="max-w-full flex flex-col justify-center items-center max-h-full  pb-[6rem] pt-[2rem] px-[2rem]">
          <Box className={`w-full flex justify-between sticky pb-2 px-2 ${
          isScrolled ? 'shadow-md' : ''
        }`}  sx={{ top: 0, backgroundColor: "white", zIndex: 1000 }}>
        <div className="w-1/3">
          <Button
            color="secondary"
            startIcon={<ArrowBackIosIcon />}
            onClick={() => {
              if (!isFirstPage) {
                setIsFirstPage(true);
              } else {
                router.back();
              }
            }}
          >
            Back
          </Button>
        </div>
        <div className="w-1/3 flex justify-center">
          <Typography variant="h4">Add Kpi</Typography>
        </div>
        <div className="w-1/3"></div>
      </Box>

      {isFirstPage ? (
        <Box className="w-full flex justify-center ">
          <Box className="w-full flex flex-wrap justify-center items-center gap-y-[4rem] ">

            <ChartWrapper
              width={500}
              height={600}
              label={"Vertical Bar Chart"}
              onClick={() => selectChart("VerticalBarChart")}
            >
              <VerticalBarChartStatic/>
            </ChartWrapper>

            <ChartWrapper
              width={500}
              height={600}
              label={""}
              onClick={() => selectChart("HorizontalBarChart")}
            >
              <HorizontalBarChartStatic/>
            </ChartWrapper>

            <ChartWrapper
              width={500}
              height={600}
              label={"Biaxial Line Chart"}
              onClick={() => selectChart("BiaxialLineChart")}
            >
              <BiaxialLineChartStatic
                years={DUMMYDATA["BiaxialLineChart"]["years"]}
                series={[
                  {
                    label: "French GDP",
                    data: DUMMYDATA["BiaxialLineChart"]["FranceGDPperCapita"],
                    showMark: false,
                  },
                  {
                    label: "German GDP",
                    data: DUMMYDATA["BiaxialLineChart"]["GermanyGDPperCapita"],
                    showMark: false,
                  },
                  {
                    label: "UK GDP per",
                    data: DUMMYDATA["BiaxialLineChart"]["UKGDPperCapita"],
                    showMark: false,
                  },
                ]}
              />
            </ChartWrapper>

            <ChartWrapper
              width={500}
              height={600}
              label={"Pie Active Arc"}
              onClick={() => selectChart("BiaxialLineChart")}
            >
              <PieActiveArcStatic data={DUMMYDATA["PieActiveArc"]["data"]} />
            </ChartWrapper>

            <ChartWrapper
              width={500}
              height={600}
              label={"Arc Design"}
              onClick={() => selectChart("ArcDesign")}
            >
              <ArcDesignStatic value={10} />
            </ChartWrapper>

            <ChartWrapper
              width={500}
              height={600}
              label={"Top N"}
              onClick={() => selectChart("TopN")}
            >
              <TopNStatic items={DUMMYDATA["TopN"]["items"]} />
            </ChartWrapper>

            <Box className="w-full flex justify-center">
              <Card
                sx={{
                  width: 850,
                  height: 600,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" gutterBottom>
                    Basic Color Legend
                  </Typography>

                  <BasicColorLegendStatic
                    dataset={DUMMYDATA["BasicColorLegend"]["dataset"]}
                    lowMargin={-0.5}
                    highMargin={0}
                  />
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
