import React, { useState } from "react";
import { MdPermMedia } from "react-icons/md";
import Modal from "./Modal";
import PostCart from "./PostCart";
import { gql, useMutation, useQuery } from "@apollo/client";
const PostCreator = () => {
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  const [createPost] = useMutation(CREATE_NEW_POST);
  const [deletePost] = useMutation(DELETE_POST_BY_ID);
  const { loading, data } = useQuery(FETCH_ALL_POSTS);

  const handleMediaClick = () => {
    setIsMediaModalOpen(!isMediaModalOpen);
  };
  const handleMediaClose = () => {
    setIsMediaModalOpen(!isMediaModalOpen);
  };

  const handleConfirm = async (data: string) => {
    try {
      if (data) {
        alert(`Are you sure to upload this?`);
        await createPost({
          variables: { body: data },
          refetchQueries: [{ query: FETCH_ALL_POSTS }],
        });
      }
      handleMediaClose();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      const res = await deletePost({
        variables: { postId },
        refetchQueries: [{ query: FETCH_ALL_POSTS }],
      });
      alert(`${res.data.deletePost}`);
    } catch (e) {
      console.log("post is not deleted yet");
    }
  };

  return (
    <div className="flex flex-col w-[70%] gap-4">
      <div className="flex flex-col gap-y-2 p-4 shadow-md h-[10rem]  backdrop-blur-lg bg-opacity-0 backdrop-filter  rounded-lg">
        <div className="flex gap-x-8">
          <div className="w-16 h-16 rounded-full overflow-hidden">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxIQEBIQEBAPFQ8QEBAWFhAPFQ8REBYQFhUWFxUWFRUYHSggGBolGxUVITQhJSkrLi4uFyAzODMtNygtLi0BCgoKDg0OGhAQGi0mICAtKy0rLS0tLS0rLS0tLystKy0tLS0tLS0tLS0tLS0tLS0tLS0tKy0rLS0tLS0tLS0tLf/AABEIAOEA4QMBEQACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAAAwQCBQYHAf/EAEYQAAEDAgMEBgYGCQALAAAAAAEAAgMEERIhMQUGQVETImFxgbEHMlKRocEzYnKi0fAUI0JDgpKy4fEVFjREU1Rjc4PC0v/EABsBAQACAwEBAAAAAAAAAAAAAAABAgQFBgMH/8QAMxEBAAIBAwIDBwMDBAMAAAAAAAECAwQRMQUSIUFREyIyYXGB0SOhwTOx8AZigpE0QkP/2gAMAwEAAhEDEQA/AMV1TkRAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQYveBqQO82XnfNjx/HaIe2LT5cv9Osz9IROrGD9rTvWLbqWnjz/Zn16Nq7RE9u2/rKF20W3sAT8Fi36xSJ92szDOx/6dyTX3rxE+nIdoi+TSot1iu/hSf+1qf6cyTE92SN/olbWsPE+IWRXqmnnnePsxL9B1deIifumbI06EHuIWZTUYrztW0S1uXSZ8Ub3pMR84ZL1Y4gICAgICAgICAgICAgICAgICAgIMJJWt1IHmvDNqsWGPen7ebL02hz6idsdfv5KNTtHLqXvzIHwWo1HVbTO2Lwh0Oj6DWvjn8Z9I4a+ScvPWJutTfJa9u607y6DDgx4qxWkbRD4G3yOvyVHrPD7Ti5bzNwe8aqURPgsMhPW77IdyONl8R/ZBtfuQ3ZNuMx4JEzE7wWrW0TW3ErMNc4HrZj4raafqmWtv1PGP3aLV9Bw3rvh92f2XYqhrtDnyOq3GDW4c3wz4+kuc1XTNRpvG1d49Y8YSrKa8QEBAQEBAQEBAQEBAQEBAQEFetq+i1AvycbDxWo1nUYrvTHz6t/07pE5JjJl49Py0M1XjNyWEntWhtMzO8uux0rWNoWaGjklNo2Pd3Alo7zoPFQva0V5dLS7mlwvLLY+zGMX3jx8FPaxran0htKfdSBvrGR55uOH+mynZSc9pWHbs0xNxGWm4PVc4Z2tobhTspGW0M27twC+T8ze2I6/kIe1sjk3Vpy0NaHsAN+q4nwOK+SbJjNaFKr3QBB6OXrZWEgy7cx+CjZeuf1hz9dsmSEkOYQAbYzmHdxGSiYe9ckS1j7DiPEhVeu+65SV3B2ntDP3rcaLqXZEUy8ev5c51PontJnLg8J849fo2IW/iYmN4clMTE7SIgQEBAQEBAQEBAQEBAQEFLadcYgAxuKV5sxuunE9y13UNV7OvZXmf2htul6OMt/aW4j95c9LSOJxzvLnG+Vzbt7/Jc9MuupXduNhbvSTkHD0cPtkAXH1W8e/TtVNpl7Wy1pG0cvRaOmbExrGCzWiwH51KswpmbTvKyAgkAQZgIMw1B9wqQwqBHJEHAtcAWkEEHQg8EN3Cbf3XdHd0TC+LM2AxPaOVtXd4VZhm480T4S5J9ONWHCezT3KN3tNfRs9j1xJ6KT1gMjzC3nTNX/8AG32/DleuaDbfUU/5fn8tst05kQEBAQEBAQEBAQEBAQEFavDW9bVxaBfTLMhgPAauJ5WXN662+azremV2wVZ7vbIEtqmYXYfo2EWDraPI9n2W6ceSwtmytk292HYwqHmstKJStUJSNQTMClCZrERuywKUbsSxQndG4IlE9Qlye9m74kDp4W2mbm5jf3g45e328dDwtEwyMObt8J4cRTOBcxw4OaQR2nyIV9Pbty1n5wvrKRfBes+kujXZPm4oBAQEBAQEBAQEBAQEAqRTrqY1FTFStvaR5DiOELBilPYTk2/YuTyzNrzPrLttPEUxx8odfJYENaAGtAAA0AGgXlK1U8SqusMKJTNKgSsUixGiJWYwpVlJZFUbwi0IHqF0D1CUD0HmW89F0FU8DJko6RvIYjZ4Hc4X8Qqz4SzMV+6u0tlE67QeYB+C7LFbupWfWIfO89e3LaseUz/dkrvIQEBAQEBAQEBAQEBAASZ2jdMRvOyfdeLFWVcxH0EMULT9aQmSTxFh71yU8zLtOKxDbtdcrzl6Q+Vu0o4G4nnM6NGbj3D5qHpSs2nwaCq3qkPqYY2+D3+85fBV3ZEYYjlXh3lfiA6aZzjo1uEknsbbNSmaV+Tv9nSPdGx0gtIWgubyKljTtv4L8ZRErLHKVJZTPIa4tALg02ByBdbIX71KNnlzt7ZsRbPLPHKDmyzWYTyw20VGZFKzwv0m9kn/ABGSDlIA13g5vzBRM4odFs3bEdRk27XgZxute3McwjytSarL0Ucb6QYOpBLbNkpYTybI38WN96S9cFtp2VKQ3jYfqN8l1umnfDSflDh9bXt1GSP90pV7MUQEBAQEBAQEBAQEBB9bqO8KLfDK1Pij6re5xvRzTf8AM1tQ/wDhGFgH3CuSdnPOy9GVR6w4itM9TUPwRyE4iBcENDQbDM5DmomGRS8Vq2I3cigZ01fPZvsR4rE8gQMTj3BIjdS+Z0G7NbQuJZSNa1w5sc15/icOt71M1mHlGSLebpmFQsnYUEzHKUJMaI2aTeGWkNo6mMSuLS4RtidNIGDV1mglrR7RsFMRMom0Vcf/AKtUtUHP2fO5jmHrRSB9geFw7rNvY55jJRNduXrTNM8NUYKuklbiikxtcMLmAvaT2Ec9LFU2ZEZKzG0vS3H/AApY0uf31ix0M3NgY/8Ake1x+AKlNJ96GioTeJh5sb5LqtH/AEKfRxvUP/KyfWU6yGGICAgICAgICAgICD6BfLiUmYiN5TETM7Q27aFkTMUli88DoOwDitBqeoXvM1x+EfvLpdJ0ulIi2SN7ftD5RTtNOGsaGta59mtAaB1jwCwPJsJ+IiKo9IW4WgaBQlwfpHncZ4m54GxkjliJz8gvWjwy8tbunVSNqI44/wB5NDcfYdcn+UvHc4qbcKU+KHsbCvFlpmlBKx19EGeJSh5RvRtmaCvrGhxHStjZ/wCJouAOzO69acMbL8SP0eTPdX3F7GGXHyw5Wv8AxYVF+E4fieoOK8WUieUQryWscQBbbMEAgjkQdVKFaTZ8EzbMa2N4GRYMLfFgyt3LO0+uyYdonxr6fhgavp2PNvaPC3r+XPTRFji1ws5psR2roqXi9YtXiXLZKWx2mtuYYKyggICAgICAgICAgtbMAMzL8/ksTX2mNPbZndOrFtTXf/PBc2y/rHsA8rrmodfHCjsl/wCqP23eal425XIXKq8LkZUJUdr7DjqgMY048VMTsrNYnlnsHduCkJewXkItjdmQOzkkzMlaRHDoWFQu120am8rY/wBlrQ4jmSTb3W+KmFoX4JQJA0aObp2jO6STwv3UKtDvBuzBWEOkBDwLY25G3IqYnZW1Ynl92HsGGja4RNzfbE85uNtBfkomZlNaxXhsXFQsieVKFeU5HuKIVqZ1nNtzHxUrypbwgdMDxMbb99yPIBb/AKXaZwzHpLlusViM8THnEfy1a2TVCAgICAgICAgICDOJ5a4OGoN1TLjjJSaT5vXDlnFki8eTZ1jmzMxNIDrZgrlcmO2K01s7LDnplpFqz4SobJiIhdfhI/zUItPvLELlSV4XY3IlZY5QlOwoJmFEtPtqkl6QTRDF1Q1zRkcr2I96mDfZa2NDKXCSVuENBs0kFxJy4aBJW3brEoVYkqBG4oI3FBE8qRBJnkNSiGLGCIY5CBbh+eKtWs3ntryZMlaVm1p2iGgrqjpXl/PIDkBouo0uD2OKK+fm47Waj2+Wb+Xl9ECyGKICAgICAgICAgICB+csl55MNMkbXjd64s+TFO9J2bXZzB+jPA1EpJvcmxa23kVo9dp64bRFOJhv9Bqb5qzN+YlUjdmtfLaQvRuULLDHKErEbkEwciUzJBzQSCQc0H0SAoPhcoEZKkYEoInlENftGYtYSCQbixGuv+Vl6PDGXLFbcMLX57YcM2rz4bNK+Quzc4k9pJXQ4tPjxfBGzmM2py5vjtuxXs8BAQEBAQEBAQEBAQEBBstiyZvjP7xmX2m3I+Bctf1LH3Y4t6Nl0zJ25Zr6qUpwvPetBLpKytwyKr0WmOQTxvUJSyxskY6ORuJjwQRdzTbsc0gg9oKDRv3LgJvHV7Si+qyoxN++0n4q3cp2fORm5MN+vXbUePZM7Wg9+Ft07js+ct/s6iip2COEODQSbve+R5J4lziSqzK8RsslyJYlyDBzkEEj0Q1G1Jb2b4/IfNbrpWP4rz9Gh6zl+HHH1UFuGiEBAQEBAQEBAQEBAQEBBnFIWuDm6tII7wovWLVms+a1LTS0WjmE+1QDaRvquF+7mPBcvmxTjvNZ8nW6fNGWkXjzVKeoXgyolsIp1CVpkiCdkihKVsiCQSIPvSIGNBiZUEMk6CnNUK9KTaYrHm873ilZtPENXI/ESea6rBijFjikeTj9RmnNkm8+bFerwEBAQEBAQEBAQEBAQEBAQSMkyLT6p+B5rD1ml9tXeOYZ+i1fsbbT8MtfKC0rnbVmJ2l01bRaN4Zx1FlVdbiq1CVuOrRKw2pQSCoQP0lQMXVakRPq0FeSpU7ImUD5LrfaDR+z/Uvz5fJznUdb7SfZ04jn5sFsmpEBAQEBAQEBAQEBAQEBAQEBBhLHiCw9Vo65o3jwlnaTXWwTtPjX/OFCVhbqtBlw3xW7bQ6PDnplr3Ulg2ReT3TxzIlajnQSGdBg6oUDA1CJYCYk2CtSlr27axvKmS9cde607Qna3mt9pNBGL3r+M/2c5reozl9ynhX95ZLYtWICAgICAgICAgICAgICAgICAgIPj2gixGSpkxUyR22jd64st8Vu6k7NdVUxbmM2/ELn9ZpPYTvE+Euj0WsjPG0x4wgjesFsFoPRLMOKDF91CWu21tFtOwE5udk1ulz+CQmsby5mn2tK6UPc8hwOVsmjsAVq3tS0WrPjD1nDTJWaWjeJdzsyvEzb5B41b8x2LpNHq656/wC6OYcj1Dp99Lf1rPE/xK4sxrRAQEBAQEBAQEBAQEBAQEBAQEBAQUd6HdFTNeJGuxyADA4HCcLtOehv3rlc+orlz27d/v8Ax8nUaTHbHiiJ2+zndkV08z+jZA6V4BJEQJdhGptmvG20cyzIuvRbbj0c2QEZEENyPvTZbvhZG2YuTvuf/SbHfBtXaEsLWOdTPY2UEsfKHAOA5CwvqOPFViYniTvTbobPdWmpmdUU7JGw9GG1DMUJbJcm4uLAYBnn4ryzX7doVid53cJNQSMcRk4tJGJhBY6xtdp4heu8Nh225bDZlc6Nwvdr28D+dFNL2x2i9J8YTelM9JxZI5dxR1IlYHDxHIrqdNqK58cWj7uG12ktpcs4548p9YTLIYYgICAgICAgICAgICAgICAgIPoF8hqom0VjeVq1m07QpbXrGxMLQQXuBBI4DkO1aXWaz2nuU4/u3ej0Xs/fvz/ZyexqSJxlhcSHTFpa6+QcAchwzv4+AWtmW0rG7pN2aWu2dJI+mbBIJWBrhIHA2BJBHLUrxy0rkjaV/Zy1tTu9WSyPkdBd8j3vdhsBicS42HK5V42iNjslmzdKsP8AuzvEgKTsl0m1NnbTroY4KgU0ccT8QddxeXYS25twsTkvGmOtJmYT2S4/bmyxRT9EZBIHMYXXAAxXOVuGgIvzVrRuy9PNaztL7GwEdh0Xm2O0Pr4gRmAdVMK2iFjd2qLWi/qusD+KzdFqZwZflPLV9S0MarBv/wC1fGPw6VdS4QQEBAQEBAQEBAQEBAQEFmCglkjfKxhcyMjERbLjpqvHJqcWO8UtbaZ4etMN71m9Y3iFmip6c08z55hHI36MuNgQBewbq6/YtfrtffT5qVrG8ebN0mijNitM+E+Tn5Nqxh4YDfIkkaC3mrW6pXf3avSvSrbe9ZDXbWswBmWK5PO2g8r+IWBqNVfNzx6Nhp9JTD8PPq52pnLjmsTdl7K7YrlQl6ZuhWGeGz/pYiA4+0D6rvGx8QVWXvSd4dTBEoWX4wpQ0u9u1hS07nixkccMbTxedPAZnwREztDyKtpnPDi8lz33Lnn1i48VZ47+O6nsOsJcYn+u027+XvXneu3i2elz98ds8w2dd1WOPsjF/CVWOWRefdfKCPDEzuCieU1j3YhcbtV7HWJxN5HXtsVs9P1DLTbuneHNa7pmGbz2xt9G9jeHAEaEAjuK6KlotWLR5uXvWa2ms+TJSqICAgICAgICAgICDZbEoYp3PbLN0WFhc1xw4ctcV+ACwNfq76atbVrvEztLL0mnrntNZnbw8Gtq95TRskip5rukNi4N4aAi+hI8Vp9blrqrVttttDdaPTTgrMTO+7kqvaUkvrHLt/BeEzuy4hVvx4lQlFLK6/WzaBYEcB2j5oMmWOYUJTRNUjtNw2E1bYwQOlhkGehc2zh8A73ptumtu16K6ikbqw94zHwVe2XvF6z5smU7zox3iLeadsk3rHm8/wDSRiFXTwuOTYnSWGl3Gw/pKtts8bX7uHN1DFKjltvQmJ7Z2cDnbkm2/gtS80tFobqplEtNjGj2OH8wuPiD7wvGPCW4m0WrvHmtTgMAHBo/t5Ae9UevdERvLbHed/8Ao79Dlp2iOS/RTTtkjsScV43OGB5GeYcpri2tvEtLmvF7zMKWzq8xtYyVpDSDgeQQC3ERftFwRcclu9Hr4pEY78R5/lpdboJvM5Kc+jcgrdxO/i0kxt4SIgQEBAQEBAQEBAQU9q1ro2YY2kySXGOxwMYLXN9Lm61PU8s+GOOOW46Xiid8k88OWkIB5ni4rTS3LBEvtlAyDUGDqfi04T9094UoWKNj3asN/CyDrtzpCzaFIXCwxPbrc4nxuaPiQrRyieHtIV1X2yDxn0nzg7UAbmY6eNrhpmS52Xg4KluVoaKaXqk9G+/IYSPfdQlqNoUZljOI3Pst9Ufie9BT3bfiilp3axvaR9nECf6VS8eO7YaS3dTt9G4qus4jgPyPhZVpHmazJtEUhvtob0SzUAoZI4ixojAksceGMgty0vla/K/NRXFEW3hr2trNoQGhp6aHp3PjkdI58wa1sZcyz4YRrgxZ3PIeE1rMWm0iTYdXf9WeGbe7iFvOm6iZ/St9vw03U9Nt+rX7/ltlt2nEBAQEBAQEBAQEGr3jqMLQwcBn3nVc3q8vtMsy6fR4vZ4ohzIKxGUzaFCUjWqUM7WFygsUkN+sfAclI20DFKG02Ey+0KMf9YH3An5J5j2YK6og8T9JDLbWf9aOE/dA+SpblaFWAZIMKukxC7cnDjz7Cmw5aNnRVgNjhlY4EcnDO3wVbRvDI02SKWnfjZu2xc9SkRtDzyZJvabSjqhYAcT5cVKiu5qiRjTS4HtcOBv4cVfFknHeLR5KZccZKTWfN1oN8xoV1kTExvDkpjadpEQICAgICAgICDJgzHL5cV55r9mO1vSHtgp35K19Zcpt2fFIe8rlpdVDWNVUp2IJ2BB8eLuDeWZ+SkbSBtkhC9CpG03XGLalIORlPuienmeT2EK6og8Z9KrbbUafap4j954+SpZaGvpnZILIUjUw0wkldMPUGTe08XfLwVRZeyyka71iXcNB8/z2KEopQoFV2qhLqNly4omnkLe7+1l0uhv34K/LwczrsfZnt8/FaWWwxAQEBAQEBAQfHus1x5NPxy/FYPUb7YdvWWw6bTfNv6Q4mufdx71z8ughCxVSsRqRYYgwpDdzj9byyUjaxuRCzHIpG83C621Iz7EMx+GH/wBkjknh66FdUQeQemJlq2nf7VPb3Pd+KpZaHP00uSQPssxkPRNNh+24cG+yO0+SC8LAADIAWAQa/aEujG+s74DiVAjLQBYaAIKsyhKm9Qlvd3pLte3kQff/AIW66Vf3bV+7SdVp71bfZtltmoEBAQEBAQEBBW2nJhid2kfNarqk+FY+rb9Kj4p+jipXXK00t1D6xVE7CpEwcgioHZd5Pmg2DJFImbKg6v0VtxV8r+DKVw8XSR/gVNeUS9aCuqEoPKPTU39ZSP8AqzD3Fh+ZVbJhwcc5PVbqePADmqrNhTEMFh4niTzKISTVYa0klBUp3Ekvd6zvgOSJSOegrSlQKr1CW03dd13DmzyI/FbPpdv1Zj5NZ1Sv6UT82/W9aAQEBAQEBAQEFDbX0XitR1Tmv3bnpXFvs452q1EtwzYqiZikSIIaH1QgutQSNQdx6If9pqf+1H/UVaqJeqq6r4UHl3pr9Sk+3N5MVbcJh53Q6HvVFl1ikVtper4qJFhilD65EoJFArPUJbLd/wClP2D5hbHpn9b7T/DXdT/ofeHRLfueEBAQEH//2Q=="
              alt="Circular Image"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="w-[90%]">
            <button className="w-full p-4 rounded-3xl border flex">
              <span className="text-left w-40 px-4">Start Post</span>
            </button>
          </div>
        </div>
        <div>
          <button
            className="flex p-2 gap-x-2 items-center text-xl border rounded-3xl"
            onClick={handleMediaClick}
          >
            <MdPermMedia />
            <span className="p-2">Write a Post</span>
          </button>
        </div>
      </div>

      {/* Post cart */}
      {/* {isImageConfirmed && (
        <PostCart imageUrl={imageUrl} handleDeletePost={handleDeletePost} />
      )} */}
      {data?.getPosts.length > 0 ? (
        data?.getPosts.map(
          (
            data: {
              body: string | null;
              username: string | undefined;
              id: string;
            },
            index: React.Key | null | undefined
          ) => (
            <PostCart
              postDetails={data.body}
              userName={data.username}
              key={index}
              id={data.id}
              handleDeletePost={handleDeletePost}
            />
          )
        )
      ) : (
        <></>
      )}

      <Modal
        open={isMediaModalOpen}
        handleClose={handleMediaClose}
        handleConfirmPost={handleConfirm}
      />
    </div>
  );
};

const FETCH_ALL_POSTS = gql`
  {
    getPosts {
      id
      body
      username
      createdAt
    }
  }
`;

const CREATE_NEW_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      username
      body
    }
  }
`;

const DELETE_POST_BY_ID = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

export default PostCreator;
