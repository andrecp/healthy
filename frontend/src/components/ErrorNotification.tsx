interface IErrorNotification {
  message: string;
}

function ErrorNotication(props: IErrorNotification) {
  return (
    <div className="box notification is-danger is-light">{props.message}</div>
  );
}

export default ErrorNotication;
