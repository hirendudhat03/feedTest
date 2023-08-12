import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {LoaderAction} from '../redux/Actions/LoaderAction';
import {SinglePostRequest} from '../redux/Actions/SinglePostAction';
import {Image, ScrollView, StyleSheet, View} from 'react-native';
import Header from '../components/Header';
import {theme} from '../core/theme';
import {Text} from 'react-native-paper';
import {Fonts} from '../core/fonts';
import {formatDistanceToNow, parseISO} from 'date-fns';

const DetailScreen = ({navigation, route}) => {
  const {slug} = route.params;
  const [post, setPost] = useState({});
  const [time, setTime] = useState('');

  const postdata = useSelector(state => state.post.data);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoaderAction(true));
    dispatch(SinglePostRequest(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, route.params]);

  useEffect(() => {
    if (postdata !== undefined && postdata !== null) {
      setPost(postdata);
      const createdAtDate = parseISO(postdata?.createdAt);
      const time = formatDistanceToNow(createdAtDate, {addSuffix: true});
      setTime(time);
    }
  }, [postdata]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.authorContainer}>
          <View style={styles.renderHeadingContainer}>
            <Image
              source={{uri: post?.author?.image}}
              style={styles.avtar}
              resizeMode="contain"
            />
            <View>
              <Text style={styles.authorName}>{post?.author?.username}</Text>
              {post?.author?.bio && (
                <Text style={styles.authorName}>{post?.author?.bio}</Text>
              )}
              <Text style={styles.followText}>{time}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.authorContainer, {marginTop: 10}]}>
          <View style={styles.bodyContainer}>
            <Text style={styles.boldTitle}>
              Title : <Text style={styles.title}>{post?.title}</Text>
            </Text>
            <Text style={[styles.boldTitle, {marginTop: 10}]}>
              Body : <Text style={styles.title}>{post?.body}</Text>
            </Text>
            <Text style={[styles.boldTitle, {marginTop: 10}]}>
              Description :{' '}
              <Text style={styles.title}>{post?.description}</Text>
            </Text>
            <View style={styles.tagContainer}>
              {post?.tagList?.map((tagitem, tagIndex) => {
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default DetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#07080B',
  },
  authorContainer: {
    backgroundColor: '#162847',
    width: theme.width - 40,
    borderRadius: 10,
  },
  renderHeadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  avtar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  authorName: {
    color: theme.colors.background,
    fontFamily: Fonts.Poppins_Bold,
    marginLeft: 20,
    fontSize: 18,
  },
  followText: {
    color: theme.colors.background,
    fontFamily: Fonts.Poppins_Bold,
    marginLeft: 20,
    fontSize: 12,
  },
  bodyContainer: {
    padding: 20,
  },
  boldTitle: {
    color: theme.colors.background,
    fontFamily: Fonts.Poppins_Bold,
    fontSize: 14,
  },
  title: {
    fontFamily: Fonts.Poppins_Regular,
    color: theme.colors.background,
    textAlign: 'justify',
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
});
