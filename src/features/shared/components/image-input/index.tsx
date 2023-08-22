/* eslint-disable @next/next/no-img-element */
import React, {ChangeEvent} from 'react';
import {Grid, TextField} from '@mui/material';
import styles from './styles.module.scss';
import PrimaryButton from '../primary-button';

interface ImageInputProps {
  imageUrl?: string;
  onChange: (value: string) => void;
  label?: string;
}

function ImageInput({imageUrl, onChange, label}: ImageInputProps) {
  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item>
        <TextField
          className={styles.textField}
          // disabled
          label={label || 'URL de la imagen'}
          variant='outlined'
          value={imageUrl}
          onChange={(event) => onChange(event.target.value)}
        />
      </Grid>
      <Grid item>
        <PrimaryButton variant='contained' component='label'>
          Cargar
          <input type='file' hidden accept='image/*' onChange={handleFileInputChange} />
        </PrimaryButton>
      </Grid>
      {imageUrl && (
        <Grid item xs={12}>
          <img className={styles.previewImage} src={imageUrl} alt='Preview' />
        </Grid>
      )}
    </Grid>
  );
}

export default ImageInput;
