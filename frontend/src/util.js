import axios from "axios";

async function updateImage(file, path) {
  const { url } = await uploadImage(file);
  const body = { profileImageUrl: url };
  const headers = { "Content-Type": "application/json" };
  return axios.put(path, body, { headers }).then((res) => res.data);
}

function uploadImage(file) {
  const form = new FormData();
  form.append("file", file);
  return axios.post("/upload-image", form).then((res) => res.data);
}

function textResize(event, defaultHeight) {
  const textAreaBox = event.target;
  textAreaBox.style.height = defaultHeight;
  textAreaBox.style.height = textAreaBox.scrollHeight + "px";
}

export { updateImage, uploadImage, textResize };
