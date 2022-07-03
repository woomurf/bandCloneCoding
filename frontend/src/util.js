import axios from 'axios';

// sample function
async function updateImage(file, path) {
  const { url } = await uploadImage(file);
  const body = { profileImageUrl: url }; // user 객체 전용으로 되어 있음 수정해서 사용할 것!
  const headers = { 'Content-Type': 'application/json' };
  return axios.put(path, body, { headers }).then((res) => res.data);
}

function uploadImage(file) {
  const form = new FormData();
  form.append('file', file);
  return axios.post('/upload-image', form).then((res) => res.data);
}

export { updateImage };
