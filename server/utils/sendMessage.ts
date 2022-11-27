const sendMessage = (success: boolean, message: string) => {
  return {
    success,
    message,
  };
};

export default sendMessage;
