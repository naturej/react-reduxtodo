import Button from "./style";

const BasicButton = ({ size, shape, variant, cursor, children, ...rest }) => {
  return (
    // ...rest로 onClick 등 이벤트 핸들러 전달
    <Button
      size={size}
      shape={shape}
      variant={variant}
      cursor={cursor}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default BasicButton;
