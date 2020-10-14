function calculate(min, max, value, isHigh) {
  return isHigh ? (value - max).toFixed(2) : (min - value).toFixed(2);
}

export function getErrorMeesage(code, min, max, value) {
  switch (code) {
    case 'PhHighLimitOver':
      return `PH ${calculate(min, max, value, true)} 초과`;
    case 'PhLowLimitOver':
      return `PH ${calculate(min, max, value, false)} 미달`;
    case 'TempHighLimitOver':
      return `온도 ${calculate(min, max, value, true)} 초과`;
    case 'TempLowLimitOver':
      return `온도 ${calculate(min, max, value, false)} 미달`;
    case 'DoxHighLimitOver':
      return `DO ${calculate(min, max, value, true)} 초과`;
    case 'DoxLowLimitOver':
      return `DO ${calculate(min, max, value, false)} 미달`;
    case 'BrixHighLimitOver':
      return `BR ${calculate(min, max, value, true)} 초과`;
    case 'BrixLowLimitOver':
      return `BR ${calculate(min, max, value, false)} 미달`;
    default:
      return '';
  }
}

export function getErrorType(code) {
  switch (code) {
    case 'PhHighLimitOver':
    case 'PhLowLimitOver':
      return 'ph';
    case 'TempHighLimitOver':
    case 'TempLowLimitOver':
      return 'temp';
    case 'DoxHighLimitOver':
    case 'DoxLowLimitOver':
      return 'dox';
    case 'BrixHighLimitOver':
    case 'BrixLowLimitOver':
      return 'brix';
    default:
      return null;
  }
}
