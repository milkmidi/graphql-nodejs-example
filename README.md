# Start
> `npm run start`


> query with parameters
```js
query($id:Int!) {
  author(id:$id){
    name,
    posts{
      title
      id
    }
  }
}


query variables, JSON format
{
  "id":2
}
```


https://ithelp.ithome.com.tw/articles/10204863