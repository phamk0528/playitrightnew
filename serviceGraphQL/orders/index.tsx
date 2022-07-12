import { mutationApi, myFetcher } from "../index";
import { toast } from "react-toastify";
export const checkOrder = async (orderRef: string) => {
    const myQuery = `query{
        checkOrder(orderRef:"${orderRef}")
      }`;
    const data = await myFetcher(myQuery);
    if (data.err) {
        toast.error(data.err);
        return;
    }
    return data;
};


export const webCreateOrderCase = async (
    params: any

) => {
    const myQuery = `mutation webCreateOrderCase(
        $orderRef: String!, 
        $name: String!
        ,$phone: String!,
         $subject: String!,
         $comments: String!,
         $photos: [String!]!
        ) {
        webCreateOrderCase(input: {
            orderRef:$orderRef,
            name:$name,
            phone:$phone,
            subject:$subject,
            comments:$comments,
            photos:$photos,
      }) {
        id
      }
    }
    `;
    const data = await mutationApi(myQuery, params);
    if (data.err) {
        toast.error(data.err);
        return;
    }
    toast.success("We have received your feedback …");
    return data;
};