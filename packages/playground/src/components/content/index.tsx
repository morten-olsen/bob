type ContentProps = {
  children: React.ReactNode;
};

const Content: React.FC<ContentProps> = ({ children }) => {
  return (
    <div className="max-w-3xl mx-auto w-full">
      <div className="flex-1 p-8">{children}</div>
    </div>
  );
};

export { Content };
