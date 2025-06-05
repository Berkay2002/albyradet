type MarginStyle = {
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
};

export const getMarginStyle = ({
  marginTop = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginRight = 0,
}: Partial<MarginStyle> = {}): string => {
  return [
    marginTop ? `mt-${marginTop}` : '',
    marginBottom ? `mb-${marginBottom}` : '',
    marginLeft ? `ml-${marginLeft}` : '',
    marginRight ? `mr-${marginRight}` : '',
  ].join(' ');
};

export const getSpacing = (value: number = 2): string => {
  return `space-y-${value * 4}`;
};

export const getPadding = (value: number = 2): string => {
  return `p-${value * 4}`;
};
