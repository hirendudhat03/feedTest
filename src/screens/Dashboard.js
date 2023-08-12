import React, {useEffect, useState} from 'react';
import Background from '../components/Background';
import {useDispatch, useSelector} from 'react-redux';
import {LoaderAction} from '../redux/Actions/LoaderAction';
import {FeedRequest} from '../redux/Actions/FeedAction';
import Loader from '../components/Loader';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  StatusBar,
  Platform,
  TextInput,
} from 'react-native';
import {theme} from '../core/theme';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Fonts} from '../core/fonts';
import {formatDistanceToNow, parseISO} from 'date-fns';
import DashboardHeader from '../components/DashboardHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PostCommentRequest} from '../redux/Actions/PostCommentAction';
import {Images} from '../core/images';
import {navConst} from '../core/navConst';

const Dashboard = ({navigation}) => {
  const [feedData, setFeedData] = useState([]);
  const [user, setUser] = useState({});
  const [page, setPage] = useState(0);
  const [comment, setComment] = useState('');

  const loader = useSelector(state => state.loader.loader);
  const feed = useSelector(state => state.feed.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoaderAction(true));
    dispatch(FeedRequest('limit=10&offset=0'));
    AsyncStorage.getItem('user').then(res => {
      setUser(JSON.parse(res));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (feed !== undefined && feed !== null) {
      const newData = [...feedData, ...feed];
      setFeedData(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feed]);

  const loadMoreData = () => {
    dispatch(LoaderAction(true));
    dispatch(FeedRequest(`limit=10&offset=${page + 1}`));
    setPage(page + 1);
  };

  const handleSend = slug => {
    if (comment !== '') {
      dispatch(LoaderAction(true));
      dispatch(PostCommentRequest(slug, comment, user.token));
      setComment('');
    }
  };

  const renderItem = ({item}) => {
    const createdAtDate = parseISO(item.createdAt);
    const timeAgo = formatDistanceToNow(createdAtDate, {addSuffix: true});
    return (
      <TouchableOpacity
        style={styles.renderContainer}
        onPress={() =>
          navigation.navigate(navConst.DatailScreen, {slug: item.slug})
        }>
        {/* ----- Author ----- */}
        <View style={styles.renderHeadingContainer}>
          <Image
            source={{uri: item.author.image}}
            style={styles.avtar}
            resizeMode="contain"
          />
          <View>
            <Text style={styles.authorName}>{item.author.username}</Text>
            {item.author.bio && (
              <Text style={styles.authorName}>{item.author.bio}</Text>
            )}
            <Text style={[styles.followText, {marginLeft: 10, fontSize: 10}]}>
              {timeAgo}
            </Text>
          </View>
          <TouchableOpacity style={styles.followView}>
            <Text style={styles.followText}>
              {item.author.following ? 'Following' : 'Follow'}
            </Text>
          </TouchableOpacity>
        </View>
        {/* ----- Body ----- */}
        <View style={styles.bodyContainer}>
          <Text style={styles.boldTitle}>
            Title : <Text style={styles.title}>{item.title}</Text>
          </Text>
          <Text style={styles.boldTitle}>
            Description : <Text style={styles.title}>{item.description}</Text>
          </Text>
          <View style={styles.tagContainer}>
            {item.tagList.map((tagitem, tagIndex) => {
              return (
                <Text
                  style={[
                    styles.tagTitle,
                    {marginLeft: tagIndex !== 0 ? 10 : 0},
                  ]}>
                  #{tagitem}
                </Text>
              );
            })}
          </View>
        </View>
        {/* ----- Footer ----- */}
        <View style={styles.footerContainer}>
          <TouchableOpacity>
            <Image
              source={item.favorited ? Images.liked : Images.heart}
              tintColor={item.favorited ? null : 'white'}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
          <Text style={[styles.boldTitle, {marginLeft: 5, marginTop: 0}]}>
            {item.favoritesCount}
          </Text>
          <TouchableOpacity style={styles.commentButton}>
            <Image
              source={Images.comment}
              tintColor={'white'}
              style={styles.likeIcon}
            />
          </TouchableOpacity>
        </View>
        {/* ----- Comment ----- */}
        <View style={styles.commentContainer}>
          <Image source={Images.user} style={styles.userImage} />
          <View style={styles.inputView}>
            <TextInput
              placeholder="Comment on this.."
              style={styles.input}
              onChangeText={setComment}
              placeholderTextColor={theme.colors.background}
            />
            <TouchableOpacity onPress={() => handleSend(item.slug)}>
              <Image
                source={Images.send}
                style={styles.likeIcon}
                tintColor={theme.colors.background}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <Loader visible={loader} />
      <DashboardHeader
        user={user}
        exitPress={() => {
          AsyncStorage.clear();
          navigation.reset({
            routes: [{name: navConst.LoginScreen}],
          });
        }}
      />
      <FlatList
        data={feedData}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        onEndReachedThreshold={0.5}
        onEndReached={loadMoreData}
        ItemSeparatorComponent={() => <View style={{marginTop: 10}} />}
      />
    </SafeAreaView>
  );
};
export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: theme.colors.dashboardBackground,
  },
  renderContainer: {
    backgroundColor: theme.colors.itemBackground,
    width: theme.width - 40,
    borderRadius: 10,
  },
  renderHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avtar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  authorName: {
    color: theme.colors.background,
    fontFamily: Fonts.Poppins_Bold,
    marginLeft: 10,
    fontSize: 14,
  },
  followView: {
    borderColor: theme.colors.background,
    borderWidth: 1,
    padding: 5,
    height: 30,
    borderRadius: 5,
    left: 10,
    bottom: theme.isIOS ? 0 : 5,
  },
  followText: {
    color: theme.colors.background,
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 12,
  },
  bodyContainer: {
    paddingHorizontal: 20,
  },
  boldTitle: {
    color: theme.colors.background,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 12,
    textAlign: 'justify',
    marginTop: 10,
  },
  title: {
    fontFamily: Fonts.Poppins_Regular,
  },
  footerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  likeIcon: {
    height: 22,
    width: 22,
  },
  commentButton: {
    marginLeft: 30,
  },
  tagContainer: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tagTitle: {
    color: theme.colors.background,
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: 12,
    textAlign: 'justify',
  },
  commentContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 30,
    height: 30,
  },
  inputView: {
    alignItems: 'center',
    marginLeft: 10,
    borderColor: theme.colors.background,
    borderWidth: 0.2,
    width: theme.width - 100,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
    flexDirection: 'row',
  },
  input: {
    color: theme.colors.background,
    paddingVertical: theme.isIOS ? 10 : 5,
    flex: 1,
  },
});
