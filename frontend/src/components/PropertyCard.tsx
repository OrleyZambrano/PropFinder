import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  Button,
} from "@mui/material";

type PropertyCardProps = {
  title?: string;
  location?: string;
  price?: number;
};

export default function PropertyCard({
  title = "Casa en Venta",
  location = "Ciudad Ejemplo",
  price = 100000,
}: PropertyCardProps) {
  return (
    <Card
      sx={{
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": { transform: "translateY(-6px) scale(1.03)", boxShadow: 6 },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image="https://source.unsplash.com/random/400x200/?house"
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Ubicación: {location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Precio: ${price.toLocaleString("en-US")}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Ver más</Button>
      </CardActions>
    </Card>
  );
}
