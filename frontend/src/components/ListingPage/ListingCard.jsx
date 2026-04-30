import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';

export default function ListingCard({pet}){
  const imgSrc = pet.images && pet.images.length ? (pet.images[0].url || pet.images[0]) : null;
  const ageYears = pet.age ?? null;
  const ageLabel = ageYears ? `${ageYears} year${ageYears === 1 ? '' : 's'}` : '';
  const metaLine = [pet.short_description, ageLabel].filter(Boolean).join(' • ');
  return (
    <Card className="h-full flex flex-col rounded-lg overflow-hidden shadow-sm border border-gray-200 bg-white">
      {imgSrc ? (
        <CardMedia
          component="img"
          className="w-full h-64 md:h-72 object-cover"
          image={imgSrc}
          alt={pet.name}
        />
      ) : (
        <div className="w-full h-64 md:h-72 bg-gray-100 flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}

      <CardContent className="flex-1 p-4 flex flex-col gap-1">
        <div className="flex justify-between items-start">
          <Typography variant="h6" className="font-semibold text-lg leading-snug">{pet.name}</Typography>
          <Chip label={pet.species?.toUpperCase()} size="small" variant="outlined" className="ml-2 text-xs" />
        </div>

        {metaLine ? (
          <Typography variant="body2" className="text-xs text-gray-500">{metaLine}</Typography>
        ) : null}

        <div className="mt-4">
          <Typography variant="h6" color="primary" className="text-blue-600 font-bold">
            ${(pet.price ?? 0).toFixed(2)}
          </Typography>
        </div>
      </CardContent>

      <CardActions className="px-4 pb-4">
        <Button variant="contained" color="primary" size="small" fullWidth className="py-2">
          VIEW DETAILS
        </Button>
      </CardActions>
    </Card>
  );
}
