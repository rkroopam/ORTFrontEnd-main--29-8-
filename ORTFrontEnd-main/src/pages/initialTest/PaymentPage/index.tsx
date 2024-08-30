import React, { useEffect, useState } from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { useMutation, useQuery,  } from "@tanstack/react-query";
import { createPayments, getPaymentModels} from "../../../api/services/payments";
import {  useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BackgroundContainer } from "../../../components/BackgroundContainer";
import { useNavigate } from "react-router-dom";


const PaymentPage = () => {
  const [paymentModels,setPaymentModels] =useState<any>([]);
  const token: any = useSelector((state: any) => state.auth.token) || localStorage.getItem("studentToken");
  const user: any = useSelector((state: any) => state.auth.user);
  const navigate = useNavigate();

  // const { data, refetch } = useQuery({
  //   queryKey: ["admin"],
  //   queryFn: () => getPayments(token),
  // });
  // console.log(data);
  
  

  const { data, refetch } = useQuery({
    queryKey: ["paymentModels"],
    queryFn: () => getPaymentModels(token).then((data)=>{
      setPaymentModels(data.items);
    }),
  });
  console.log(data,"Payments Models-------------");

  const createPaymentMutation = useMutation({
    mutationFn: (payload: any) => createPayments(token, payload),
    onSuccess: (res: any) => {
      if (res) {
        // refetch();
        console.log("success Url", res.data.paypalLinksOnPaymentCreation.filter((data:any)=>data.rel=="approval_url")[0].href);
        window.open(res.data.paypalLinksOnPaymentCreation.filter((data:any)=>data.rel=="approval_url")[0].href,"_blank");
        toast.success("done");
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
  // useEffect(() => {
  //   createPaymentMutation.mutate({ paymentModleId: "66bb076bd130698ebee25a29" });
    
  // }, []);
  return (
    <BackgroundContainer>
        <Typography
          variant="h4"
          sx={{
            fontSize: "1.75rem",
            marginBottom: "2rem",
            textAlign: "center",
          }}
        >
          Choose your plan
        </Typography>
        <Grid container spacing={3} p={2} justifyContent={"center"}
        >
          {paymentModels && paymentModels.map((plan:any, index:number) => (
            <Grid item xs={3} 
              key={index}
             
            >
              <Box  sx={{
                backgroundColor: "#fff",
                
                borderRadius: "8px",
                padding: "2rem",
                boxShadow: "0 4px 25px rgba(0, 0, 0, 0.1)",
              }}>
              <Typography
                variant="h5"
                sx={{ fontWeight: 700, fontFamily: "Cadman" }}
              >
                {plan?.name}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  marginTop: "1rem",
                  fontSize: "1.25rem",
                  marginBottom: "0",
                }}
              >
                {plan?.perHeadAmount}
              </Typography>
              <Typography
                sx={{
                  marginTop: "0.75rem",
                  fontSize: "0.9rem",
                  opacity: 0.6,
                  marginBottom: "0",
                  textTransform:"capitalize"
                }}
              >
                {plan?.period}
              </Typography>
              <Typography
                sx={{
                  marginTop: "1.5rem",
                  fontSize: "0.8rem",
                  lineHeight: 1.4,
                  fontWeight: 400,
                  textTransform:"uppercase"
                }}
              >
                {plan?.status}
              </Typography>
              <Button
              onClick={()=>{createPaymentMutation.mutate({ paymentModleId: plan?.id,isPaymentInitiatedByParent:true })}}
                sx={{
                  marginTop: "1rem",
                  buttonColor: "#1E824C", backgroundColor: "#1E824C",
                  color: "#fff",
                  padding: "0.8rem 1rem",
                  border: "1px solid #1E824C",
                  borderRadius: "4px",
                  width: "100%",
                  fontWeight: 700,
                  "&:hover": {
                    backgroundColor: "#fff",
                    borderColor: "#1E824C",
                    color: "#1E824C",
                  },
                }}
              >
                Get started
              </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end", // Align the skip button to the right
          marginTop: "3rem",
        }}
        onClick={()=>navigate("/student/dashboard")}
      >
        <Button
        variant="contained"
         sx={{padding:"10px 20px",fontSize:"15px" }}
          
        >
          Skip
        </Button>
      </Box>
    </BackgroundContainer>
  );
};

export default PaymentPage;
