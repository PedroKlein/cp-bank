import React from "react";

// import { Container } from './styles';

const Loader: React.FC = () => {
  return (
    <div className="rounded-full h-16 w-16 border-t-4 border-b-4 border-primary animate-spin" />
  );
};

export default Loader;
