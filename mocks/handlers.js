import { rest } from 'msw'

export const handlers = [
  rest.post('/mock/redirect_flows', (req, res, ctx) => {
    const {given_name, family_name, email} = req.body;

    const request = {
        "redirect_flows": {
          "description": "Happy Paws",
          "session_token": "SESS_wSs0uGYMISxzqOBq",
          "success_redirect_url": "https://example.com/pay/confirm",
          "prefilled_customer": {
            "given_name": given_name,
            "family_name": family_name,
            "email": email
          },
          "links": {
               "creditor": "CR123"
           }
        }
    }


    console.log("create redirect flow post: ", request);
    return res(
      ctx.status("201"),
      ctx.json({
        "redirect_flows": {
          "id": "RE123",
          "description": "Happy Paws",
          "session_token": "SESS_wSs0uGYMISxzqOBq",
          "scheme": null,
          "success_redirect_url": "https://example.com/pay/confirm",
          "redirect_url": "http://pay.gocardless.com/flow/RE123",
          "created_at": "2014-10-22T13:10:06.000Z",
          "links": {
            "creditor": "CR123"
          }
        }
      })
    )
  }),
  rest.get('/mock/redirect_flows', (req, res, ctx) => {
    return res(
      ctx.json([
        {
          id: '60333292-7ca1-4361-bf38-b6b43b90cb16',
          author: 'John Maverick',
          text:
            'Lord of The Rings, is with no absolute hesitation, my most favored and adored book by‑far. The triology is wonderful‑ and I really consider this a legendary fantasy series. It will always keep you at the edge of your seat‑ and the characters you will grow and fall in love with!',
        },
      ])
    )
  }),
  // POST https://api.gocardless.com/redirect_flows/RE123/actions/complete HTTP/1.1
  rest.post('/mock/redirect_flows/:redirect_flows_id/actions/complete', (req, res, ctx)=>{

    const { redirect_flows_id } = req.params

    return res(ctx.json({
        "redirect_flows": {
          "id": redirect_flows_id,
          "description": "Happy Paws",
          "session_token": "SESS_wSs0uGYMISxzqOBq",
          "scheme": null,
          "success_redirect_url": "https://example.com/pay/confirm",
          "confirmation_url": `https://pay.gocardless.com/flow/${redirect_flows_id}/success`,
          "created_at": "2014-10-22T13:10:06.000Z",
          "links": {
            "creditor": "CR123",
            "mandate": "MD123",
            "customer": "CU123",
            "customer_bank_account": "BA123"
          }
        }
    }))
  }),

  rest.post('/mock/customers', (req, res, ctx)=>{

    //const { redirect_flows_id } = req.params

    return res(ctx.json({
        "redirect_flows": {
          "id": "redirect_flows_id",
          "description": "Happy Paws",
          "session_token": "SESS_wSs0uGYMISxzqOBq",
          "scheme": null,
          "success_redirect_url": "https://example.com/pay/confirm",
          "confirmation_url": `https://pay.gocardless.com/flo/success`,
          "created_at": "2014-10-22T13:10:06.000Z",
          "links": {
            "creditor": "CR123",
            "mandate": "MD123",
            "customer": "CU123",
            "customer_bank_account": "BA123"
          }
        }
    }))
  })



]
