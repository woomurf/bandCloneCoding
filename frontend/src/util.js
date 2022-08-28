import axios from 'axios';

export async function updateImage(file, path) {
  const { url } = await uploadImage(file);
  const body = { profileImageUrl: url };
  const headers = { 'Content-Type': 'application/json' };
  return axios.put(path, body, { headers }).then((res) => res.data);
}

export function uploadImage(file) {
  const form = new FormData();
  form.append('file', file);
  return axios.post('/upload-image', form).then((res) => res.data);
}

export function textResize(event, defaultHeight) {
  const textAreaBox = event.target;
  textAreaBox.style.height = defaultHeight;
  textAreaBox.style.height = textAreaBox.scrollHeight + 'px';
}

