using System.Drawing;
using System.Drawing.Drawing2D;
using System;
using System.Drawing.Imaging;
using System.IO;
using ImageResizer;

namespace Punnel.Utils
{
    public static class ImageHelper
    {
        public static Image Resize(this Image image, int width, int height, bool keepSizeRatio = true)
        {
            if (width == image.Width && height > image.Height)
                return image;
            if (width > image.Width && height == image.Height)
                return image;
            if (width == image.Width && height == image.Height)
                return image;

            ResizeSettings resizeSettings;
            if (keepSizeRatio == true)
            {
                resizeSettings = new ResizeSettings(width, height, FitMode.Max, null);
            }
            else
            {
                resizeSettings = new ResizeSettings(width, height, FitMode.Carve, null);
            }

            MemoryStream dStream = new MemoryStream();
            ImageResizer.ImageBuilder.Current.Build(image, dStream, resizeSettings, false);

            return Image.FromStream(dStream);
        }
        public static Stream Resize(this Stream image, int width, int height, bool keepSizeRatio = true)
        {

            ResizeSettings resizeSettings;
            if (keepSizeRatio == true)
            {
                resizeSettings = new ResizeSettings(width, height, FitMode.Max, null);
            }
            else
            {
                resizeSettings = new ResizeSettings(width, height, FitMode.Carve, null);
            }

            MemoryStream dStream = new MemoryStream();
            ImageResizer.ImageBuilder.Current.Build(image, dStream, resizeSettings, true);
            dStream.Seek(0, SeekOrigin.Begin);

            return dStream;
        }
        public static Image ResizeAndCrop(this Image image, int width, int height,int top, int left, bool keepSizeRatio = true)
        {
            if (width == image.Width && height > image.Height)
                return image;
            if (width > image.Width && height == image.Height)
                return image;
            if (width == image.Width && height == image.Height)
                return image;

            ResizeSettings resizeSettings;
            if (keepSizeRatio == true)
            {
                resizeSettings = new ResizeSettings(width, height, FitMode.Max, null);
            }
            else
            {
                resizeSettings = new ResizeSettings(width, height, FitMode.Carve, null);
            }

            MemoryStream dStream = new MemoryStream();
            ImageResizer.ImageBuilder.Current.Build(image, dStream, resizeSettings, false);

            return Image.FromStream(dStream);
        }
        public static Image CropImage(Image Image, int Height, int Width, int StartAtX, int StartAtY)
        {
            Image outimage;
            MemoryStream mm = null;
            try
            {
                //check the image height against our desired image height
                if (Image.Height < Height)
                {
                    Height = Image.Height;
                }

                if (Image.Width < Width)
                {
                    Width = Image.Width;
                }

                //create a bitmap window for cropping
                Bitmap bmPhoto = new Bitmap(Width, Height, PixelFormat.Format24bppRgb);
                bmPhoto.SetResolution(72, 72);

                //create a new graphics object from our image and set properties
                Graphics grPhoto = Graphics.FromImage(bmPhoto);
                grPhoto.SmoothingMode = SmoothingMode.AntiAlias;
                grPhoto.InterpolationMode = InterpolationMode.HighQualityBicubic;
                grPhoto.PixelOffsetMode = PixelOffsetMode.HighQuality;

                //now do the crop
                grPhoto.DrawImage(Image, new Rectangle(0, 0, Width, Height), StartAtX, StartAtY, Width, Height, GraphicsUnit.Pixel);

                // Save out to memory and get an image from it to send back out the method.
                mm = new MemoryStream();
                bmPhoto.Save(mm, System.Drawing.Imaging.ImageFormat.Jpeg);
                Image.Dispose();
                bmPhoto.Dispose();
                grPhoto.Dispose();
                outimage = Image.FromStream(mm);

                return outimage;
            }
            catch (Exception ex)
            {
                throw new Exception("Error cropping image, the error was: " + ex.Message);
            }
        }
    }
}