import { read, utils } from 'xlsx';

export const postData = async ({ url, data }: { url: string; data?: any }) => {
  const res: Response = await fetch(url, {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    credentials: 'same-origin',
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    console.log('Error in POST ', {
      url,
      data,
      res,
    });
  }

  return res.json();
};
