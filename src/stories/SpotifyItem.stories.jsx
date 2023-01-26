import React from "react";
import SpotifyItem from "../components/SpotifyItem/SpotifyItem";

export default {
  title: "components/SpotifyItem",
  component: SpotifyItem,
};

const Template = (args) => (
  <div className="spotify-item-wrapper">
    <SpotifyItem {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: "Title here",
  subtitle: "Subtitle here",
  imageUrl: "https://i.scdn.co/image/ab67616d0000b27333b8541201f1ef38941024be",
};

export const Group = (args) => (
  <div
    style={{
      width: "500px",
      minHeight: "600px",
      display: "flex",
      flexDirection: "column",
      background: "white",
      padding: "50px 15px",
      borderRadius: "6px",
    }}
  >
    {Array.from(new Array(5)).map(() => {
      return <Template {...args} />;
    })}
  </div>
);
Group.args = {
  ...Default.args,
};
