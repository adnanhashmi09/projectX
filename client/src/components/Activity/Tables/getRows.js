
export default function getRows(status,data){
    if(!data) return []
    let userActivity = []
    data.forEach(doc => {
        if(doc.status === status || status == 'Total') userActivity.push(createData(doc));
        
    });
    return userActivity
}

function createData(doc) {
    const {title,description,category,status,dateIssued} = doc
    return {
      title,
      category,
      date:dateIssued ? dateIssued.substring(0,10) :'',
      status,
      history:description
    };
}