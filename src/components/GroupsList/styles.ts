import { StyleSheet } from 'react-native';
import Metrics from 'src/config/metrics';
import { AppStyles } from 'src/config/styles';

const styles = StyleSheet.create({
  card: {
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenHeight / 3.6,
    margin: 5,
  },
  cardView: {
    width: Metrics.screenWidth / 2.5,
    height: Metrics.screenHeight / 3.6,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footer: {
    width: Metrics.screenWidth / 2.5 - 16,
    paddingVertical: 22,
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: AppStyles.colors.separator,
  },
  nameView: {
    alignItems: 'center',
    padding: 8,
    paddingTop: 16,
  },
  nameText: {
    marginTop: 8,
    color: AppStyles.colors.black,
    fontSize: 15,
    textAlign: 'center',
  },
  last: {
    marginTop: 4,
    color: AppStyles.colors.grey,
    fontSize: 12,
    textAlign: 'center',
  },
  members: {
    color: AppStyles.colors.grey,
    fontSize: 12,
    textAlign: 'center',
  },
  list: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
