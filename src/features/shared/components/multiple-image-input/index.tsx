/* eslint-disable @next/next/no-img-element */
import React, {ChangeEvent, useState} from 'react';
import {Grid, CircularProgress, Chip} from '@mui/material';
import styles from './styles.module.scss';
import PrimaryButton from '../primary-button';

interface ImageInputProps {
  imageUrls?: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

function MultipleImageInput({imageUrls = [], onChange, label}: ImageInputProps) {
  const [loading, setLoading] = useState(false);

  const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      try {
        setLoading(true);
        const newImageUrls = [...imageUrls];

        for (let i = 0; i < files.length; i++) {
          const file = files[i];

          const response = await fetch('/api/getProjectGalleryUploadUrl?fileType=' + file.type);
          const {uploadURL, key} = await response.json();

          await fetch(uploadURL, {
            method: 'PUT',
            body: file,
            headers: {
              'Content-Type': file.type,
            },
          });

          newImageUrls.push(`https://projects-cover-photos.s3.amazonaws.com/${key}`);
        }

        onChange(newImageUrls);
      } catch (error) {
        console.error('File upload failed:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        {imageUrls.map((url, index) => (
          <Chip key={index} label={url} className={styles.chip} />
        ))}
      </Grid>
      <Grid item>
        <PrimaryButton variant='contained' component='label' disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Cargar Fotos'}
          <input type='file' hidden accept='image/*' onChange={handleFileInputChange} multiple />
        </PrimaryButton>
      </Grid>
      {imageUrls.length > 0 && (
        <Grid item xs={12}>
          <div>
            {imageUrls.map((url, index) => (
              <img className={styles.previewImage} src={url} alt={`Preview ${index + 1}`} key={index} />
            ))}
          </div>
        </Grid>
      )}
    </Grid>
  );
}

export default MultipleImageInput;
