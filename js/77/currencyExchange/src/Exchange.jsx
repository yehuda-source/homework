

export default function Exchange({result}) {

  if(result){
  return (
    <div>
      <p> The exchange is </p><h1>{result.amount} {result.fullFirst} is {formatTotal(result.total)} {result.fullLast}</h1>
    </div>
  )
}
}
  function formatTotal(total){
    return (Math.round(total * 100)) / 100;
    
  }
