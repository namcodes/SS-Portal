import axios from "axios";
import slugify from "slugify";
// sample file upload lang. this will be separated as a new componenet

const getSignedUrl = async (fileName: any, type: any, bucket: any) => {
  const apiBase = process.env.API_GATEWAY_BASE_URL;
  const resp = await axios.get(
    `${apiBase}presigned-provider/presignedUrl?filename=${encodeURIComponent(
      fileName
    )}&type=${encodeURIComponent(type)}&method=upload&bucket=${bucket}`
  );
  if (resp.status === 200 && resp.data.success) {
    return resp.data.urls[0];
  }

  return null;
};

const s3Upload = async (data: any) => {
  try {
    let resp: any = {};
    const { file, bucket } = data;
    const ts = Math.round(new Date().getTime() / 1000);
    let fileName = file.name;
    const fileNameData = fileName.split(".");

    const fileExtension = fileNameData[fileNameData.length - 1].toLowerCase();

    fileNameData.pop();
    fileName = fileNameData.join(" ");

    fileName = slugify(fileName.toLowerCase(), {
      remove: /[*+~.()/'"!:@,?]/g,
    });

    fileName = `${fileName}.${fileExtension}`;
    const s3Name = data.dir
      ? `${data.dir}/${ts}-${fileName}`
      : `${ts}-${fileName}`;

    const signedUrlData = await getSignedUrl(s3Name, file.type, bucket);

    if (signedUrlData) {
      const formData = new FormData();
      Object.keys(signedUrlData.fields).forEach((key) => {
        formData.append(key, signedUrlData.fields[key]);
      });
      formData.append("file", file);
      resp = await axios.post(signedUrlData.url, formData, {});
      resp.s3Path = s3Name;

      return resp;
    } else {
      return null;
    }
  } catch (e: any) {}
};

export default s3Upload;
