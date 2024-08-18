import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import SideBar from "../components/SideBar";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Spinner";
import { HomePageVideos } from "../Types";
import Card from "../components/Card";
import { clearVideos } from "../store";

export default function Home() {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state)=> state.youtubeApp.videos);

  useEffect(()=>{
    dispatch(getHomePageVideos(false))
  }, [dispatch]);

  useEffect(()=>{
    return () =>{
      dispatch(clearVideos());
    };
  }, [dispatch])

  return (
    <div className="max-h-screen overflow-hidden">
      <div style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex" style={{ height: "92.5vh" }}>
        <SideBar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={()=>dispatch(getHomePageVideos(false))}
            hasMore={videos.length < 500}
            loader={<Spinner/>}
            height={650}
          >
            <div>
              {videos.map((item: HomePageVideos)=>{
                return <Card data={item} key={item.videoId}/>;
              })}
            </div>
          </InfiniteScroll>
        ) : (<Spinner/>)}
      </div>
    </div>
  );
}
