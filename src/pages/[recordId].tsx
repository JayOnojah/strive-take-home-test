import BaseLayout from '@/components/BaseLayout';
import Sidebar from '@/components/Sidebar';
import {
  type GetServerSidePropsContext,
  type InferGetServerSidePropsType,
} from 'next';
import { getData } from './api/lessons';
import SlidesContent from '@/components/SlidesContent';

export default function Lesson({
  recordId,
  recordsList,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <BaseLayout noVerticalPad>
      <Sidebar items={recordsList} />
      <SlidesContent recordId={recordId} />
    </BaseLayout>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  // server side code here
  const { recordId } = ctx.params as { recordId: string };

  const recordsList = await getData();
  return {
    props: {
      recordId,
      recordsList: JSON.parse(JSON.stringify(recordsList)),
    },
  };
};
