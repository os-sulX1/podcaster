"use client";
import PodcastCard from "@/components/PodcastCard";
import { Button } from "@/components/ui/button";
import { podcastData } from "@/constants";
import React from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

type Props = {};

const Home = (props: Props) => {
	const trendingPodcasts = useQuery(api.podcast.getTrendingPodcasts);
	return (
		<div className="mt-9 flex flex-col gap-9">
			<section className="flex flex-col gap-5">
				<h1 className="text-20 font-bold text-white-1 ">Trending Podcast</h1>
				
				<div className="podcast_grid">
					{trendingPodcasts?.map(({_id ,imageUrl , podcastTitle ,podcastDescription}) => (
						<PodcastCard
							title={podcastTitle}
							podcastId={_id}
							description={podcastDescription}
							imgUrl={imageUrl}
							key={_id}
						/>
					))}
				</div>
			</section>
		</div>
	);
};

export default Home;
