# Backend API Document  
1.使用者註冊  
  Request method & URL
  
  Method        | URL
  --------------|:-----
  Post    | /api/v1/users/sign_up    
  
  Parms and type

  Type           | Params  | Values | Note
  --------------|:-----:|-----:| ----
  String(必填)    | phone |   |  
  
  Response
  
  Status           | Response
  --------------|:-----
  200    | { "token": "ey…………" }
  400    |
 
2.使用者登入  
  Request method & URL
  
  Method        | URL
  --------------|:-----
  Post    | /api/v1/users/sign_in    
  
  Parms and type

  Type           | Params  | Values | Note
  --------------|:-----:|-----:| ----
  String(必填)    | phone |   |  
  
  Response
  
  Status           | Response
  --------------|:-----
  200    | { "token": "ey…………" }
  400    |
  
3.Pixnet文章搜尋  
  Request method & URL
  
  Method        | URL
  --------------|:-----
  Get    | /api/v1/querys/search    
  
  Parms and type

  Type           | Params  | Values | Note
  --------------|:-----:|-----:| ----
  String(必填)    | keyword |   |  
  String(選填)    | page |   |  
  
  Response
  
  Status           | Response
  --------------|:-----
  200    | [{ "id": ..., "article_id": ..., "site_category": ..., "title": ..., "public_at": ..., "link": ..., "image": ..., "hit": ... }, {}, {}]    
  400    |

4.Get trip  
  Request method & URL
  
  Method        | URL
  --------------|:-----
  Get    | /api/v1/trips/get_trip    
  
  Parms and type

  Type           | Params  | Values | Note
  --------------|:-----:|-----:| ----
  String(必填)    | start |   |  
  String(必填)    | end |   |  
  array(必填)    | articles |   | 在api 3取得的id
  
  Response
  
  Status           | Response
  --------------|:-----
  200    | [{ "id": ..., "article_id": ..., "site_category": ..., "title": ..., "public_at": ..., "link": ..., "image": ..., "hit": ... }, {}, {}]    
  400    |
