import { getRepository, getConnection } from 'typeorm';
import { account } from '../entity/Account';

export const getAccount = async () => {
    return "emberow";
};

export const getAllAccount = async () => {
    const postRepository = getRepository(account);
    const accounts: account[] = await postRepository.find();
    console.log("aaaaaaaaaa")
    // throw(new CommonError('Get Data Error'));
  
    // const result: IPostList = {
    //   list: posts,
    //   count,
    // };
  
    return accounts;
  };