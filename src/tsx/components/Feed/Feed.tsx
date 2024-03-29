import { Box, SxProps, Typography } from "@mui/material";

import InfiniteScroll from "react-infinite-scroller";

import { useDispatch } from "react-redux";
import { postsAPI } from "../../redux/api/postsAPI";
import { useAppSelector } from "../../redux/hooks";
import {
  getFeedFilters,
  setPageQuery,
} from "../../redux/slices/feedFiltersSlice";
import { titleFilterMatch } from "../NavBar/NavBarLeft/SearchInput/handlers";
import Post from "./Post/Post";

const feedSX: SxProps = {
  "&": {
    height: "100%",
    overflow: "auto",
    width: "75%",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    pt: "5rem",
  },
};
function Feed() {
  const { isLoading, isFetching, data } = postsAPI.useGetPostsQuery({});
  const dispatch = useDispatch();
  const { searchQuery, page } = useAppSelector(getFeedFilters);

  if (isLoading || isFetching) return <>Loading...</>;

  const postsList = data?.data
    .filter((post) =>
      searchQuery
        ? titleFilterMatch(post.shopName || post.username, searchQuery)
        : true
    )
    .slice(0, 6 * (page + 1))
    ?.map((post, index) => <Post key={post.id} {...post} index={index} />);

  const content = postsList?.length ? (
    postsList
  ) : (
    <Typography sx={{ margin: "25% auto", fontSize: "2.5rem" }}>
      {`No posts with title of "${searchQuery}" are found!`}
    </Typography>
  );

  const handlePostsLoader = () => {
    dispatch(setPageQuery(page + 1));
  };

  return (
    <InfiniteScroll
      threshold={100}
      pageStart={page}
      hasMore={page * 6 < (data?.data?.length || 0)}
      loadMore={handlePostsLoader}
    >
      <Box sx={feedSX}>{content}</Box>
    </InfiniteScroll>
  );
}

export default Feed;
