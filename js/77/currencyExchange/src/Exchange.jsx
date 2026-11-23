

export default function Exchange({result}) {
  if(result){
  return (
    <div>
      <p> The exchange is </p><h1>{result.amount} {result.base} is {result.total} {result.quote}</h1>
    </div>
  )
}
}
