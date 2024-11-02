"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import VerticalBarChart from "@/components/chart/VerticalBarChart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useAppDispatch, useAppSelector } from "@/utils/redux/hooks";
import { deleteChart, getAllCharts } from "@/utils/redux/actions/kpi";
import { CreateKpiModel, KpiDetailsModel } from "@/models/KpiModels";
import ChartWrapper from "@/components/wrapper/chartWrapper";
import HorizontalBarChart from "@/components/chart/HorizontalBarChart";
import BiaxialLineChart from "@/components/chart/BiaxialLineChart";
import PieActiveArc from "@/components/chart/PieActiveArc";
import ArcDesignStatic from "@/components/chart_static/ArcDesignStatic";
import ArcDesign from "@/components/chart/ArcDesign";
import TopN from "@/components/chart/TopN";
import BasicColorLegend from "@/components/chart/BasicColorLegend";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditDeleteButtons from "@/components/shared/EditDeleteButtons";
import { setIdle } from "@/utils/redux/actions/auth";




const KpiPage: React.FC = () => {
  const { status } = useAppSelector((state: any) => state.reducer);
  const [isScrolled, setIsScrolled] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { allCharts } = useAppSelector((state: any) => state.reducer);

  const onAdd = () => {
    router.push("/kpi/add");
  };

  React.useEffect(()=>{
    if(status === 'success'){
       dispatch(setIdle());
       setRefresh(!refresh);
    }
  },[status])

  const onDeleteChart = async (e: React.FormEvent, id: number) => {
    e.preventDefault();
    await dispatch(deleteChart(id));
    
  };

  React.useEffect(() => {
    dispatch(getAllCharts());
  }, [refresh]);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  return (
    <Box className="w-full flex flex-col justify-center mb-[4rem] ">
      <Box className={`w-full flex justify-between sticky pb-2 px-2 ${
          isScrolled ? 'shadow-md' : ''
        }`}  sx={{ top: 0, backgroundColor: "white", zIndex: 1000 }}>
        <div className="w-1/3">
          <IconButton color="primary" onClick={onAdd}>
            <AddCircleIcon
              sx={{ fontSize: 40, color: "primary.main" }}
            ></AddCircleIcon>
          </IconButton>
        </div>
        <div className="w-1/3 flex justify-center">
          <Typography variant="h4">Kpi</Typography>
        </div>
        <div className="w-1/3"></div>
      </Box>

      <Box className="w-full flex flex-wrap justify-center items-center gap-y-[4rem]">
        {allCharts?.map((item: KpiDetailsModel, index: number) => {
          let content;
          switch (item.chartType) {
            case "VerticalBarChart":
              content = (
                <ChartWrapper
                  width={500}
                  height={600}
                  label={item.label}
                  key={`kpi-${index}`}
                  onDelete={(e: React.FormEvent) => onDeleteChart(e, item.id)}
                  onEdit={()=> console.log(allCharts[index])}
                >              
                  <VerticalBarChart chart={item} />
                  
                </ChartWrapper>
              );
              break;

              case "HorizontalBarChart":
                content = (
                  <ChartWrapper
                    width={500}
                    height={600}
                    label={item.label}
                    key={`kpi-${index}`}
                    onDelete={(e: React.FormEvent) => onDeleteChart(e, item.id)}
                  >
                    <HorizontalBarChart chart={item} />
                  </ChartWrapper>
                );
                break;

              case "BiaxialLineChart":
                content = (
                  <ChartWrapper
                    width={500}
                    height={600}
                    label={item.label}
                    key={`kpi-${index}`}
                    onDelete={(e: React.FormEvent) => onDeleteChart(e, item.id)}
                  >
                    <BiaxialLineChart chart={item} />
                  </ChartWrapper>
                );
                break;

                case "PieActiveArc":
                  content = (
                    <ChartWrapper
                      width={500}
                      height={600}
                      label={item.label}
                      key={`kpi-${index}`}
                      onDelete={(e: React.FormEvent) => onDeleteChart(e, item.id)}
                    >
                      <PieActiveArc chart={item} />
                    </ChartWrapper>
                  );
                  break;

                  case "ArcDesign":
                    content = (
                      <ChartWrapper
                      width={500}
                      height={600}
                      label={"Arc Design"}
                      onDelete={(e: React.FormEvent) => onDeleteChart(e, item.id)}
                    >
                      <ArcDesign chart={item} />
                    </ChartWrapper>
                    );
                    break;


                    
                  case "TopN":
                    content = (
                      <ChartWrapper
                      width={500}
                      height={600}
                      label={item.label}
                      onDelete={(e: React.FormEvent) => onDeleteChart(e, item.id)}
                    >
                      <TopN chart={item} />
                    </ChartWrapper>
                    );
                    break;

                    case "BasicColorLegend":
                      content = (
                        
                        <Box className="w-full lg:w-1/2  flex justify-center">
                        <Card
                          sx={{
                            width: 850,
                            height: 500,
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <CardContent sx={{ flexGrow: 1 }}>
                          <div className="flex items-center justify-between">

       
         
                              <Typography
                              variant="h6"
                              component="div"
                              gutterBottom
                              sx={{
                                wordWrap: "break-word",
                                overflowWrap: "break-word",
                                whiteSpace: "normal",
                                maxWidth: "100%",
                              }}
                              >
                                  {item.label}
                                </Typography>
                                <EditDeleteButtons onDelete={(e: React.FormEvent) => onDeleteChart(e, item.id)}/>
                                </div>

                            <BasicColorLegend
                              chart={item}
                            />
                          </CardContent>

                        </Card>
                      </Box>
                      );
                      break;


            
            default:
              break;
          }

          return content;
        })}
      </Box>
    </Box>
  );
};

export default KpiPage;
