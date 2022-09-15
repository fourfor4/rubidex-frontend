import React from "react";
import { Typography } from "antd";
import { IBlocksetFields } from "../../interfaces/blockset";
import { AppDispatch } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { createUserBlockset } from "../../redux/actions";
import { blocksetState } from "../../redux/selectors";
import CreateBlocksetForm from "../../components/CreateBlocksetForm";

const { Title } = Typography;

const CreateBlockset: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isCreating } = useSelector(blocksetState);

  const onSubmit = (requestData: IBlocksetFields) => {
    dispatch(createUserBlockset(requestData));
  };

  return (
    <div>
      <Title>Create User Blockset</Title>
      <CreateBlocksetForm onSubmit={onSubmit} isCreating={isCreating} />
    </div>
  );
};

export default CreateBlockset;
