import { useParams } from "react-router-dom";
import { instance } from "../../config";
import useSWR from "swr";
import cogoToast from "cogo-toast";
import { Suspense } from "react";
import { UILoader } from "../../components/loaders";
import { Card } from "../../components";

export const More = () => {
  // params 에 useParams() 를 사용하여 id 값을 가져온다.
  const params = useParams().id;
  // fetcher 에는 api 주소를 넣고, 해당 api 를 통해 데이터를 가져온다.
  const fetcher = (url: string) => instance.get(url).then((res) => res.data);
  const { data, error } = useSWR("/recipe/" + params, fetcher, {
    suspense: true,
  });
  // 에러가 있다면 에러를 토스트로 띄우고, null 을 반환한다.
  if (error) {
    console.log(error);
    cogoToast.error(error?.response?.data?.error);
    return null;
  }
  return (
    <Suspense fallback={<UILoader />}>
      <div className="flex items-center justify-center m-auto">
        <Card
          isFull={true}
          id={data?._id}
          title={data?.title}
          image={data?.image?.url}
          ingredients={data?.ingredients}
          note={data?.note}
          description={data?.description}
          email={data?.user?.email}
          avatar="https://images.unsplash.com/photo-1612766959025-ac18e2b3bb96?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
        />
      </div>
    </Suspense>
  );
};
