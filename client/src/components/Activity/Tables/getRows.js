export default function getRows(status, data) {
  console.log(data, 'this is the data');
  if (!data) return [];
  let userActivity = [];
  data.forEach((doc) => {
    if (!doc) return;
    if (doc.status === status || status == 'Total')
      userActivity.push(createData(doc));
  });
  userActivity.reverse();
  return userActivity;
}

function createData(doc) {
  const {
    title,
    description,
    category,
    status,
    dateIssued,
    name,
    comments,
    _id,
  } = doc;

  return {
    name,
    title,
    category,
    date: dateIssued ? dateIssued.substring(0, 10) : '',
    status,
    history: description,
    comments,
    _id,
  };
}
