import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import EditDeleteButtons from "../shared/EditDeleteButtons";

interface ChartWrapperProps {
  children: React.ReactNode;
  width: number;
  height: number;
  label: string;
  onClick?: () => void;
  onDelete?: (e: React.FormEvent) => void;
  onEdit?: (e: React.FormEvent) => void;
}

const ChartWrapper: React.FC<ChartWrapperProps> = ({
  children,
  width,
  height,
  label,
  onClick,
  onDelete,
  onEdit,
}) => {
  return (
    <Box className="w-full lg:w-1/2 xl:w-1/3 flex justify-center">
      <Card
        sx={{
          width: width,
          height: height,
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
              {label}
            </Typography>
            {onDelete && (
              <EditDeleteButtons onDelete={onDelete} onEdit={onEdit} />
            )}
          </div>
          {children}
        </CardContent>
        {onClick && (
          <CardActions>
            <Button size="medium" onClick={onClick}>
              Select
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};

export default ChartWrapper;
