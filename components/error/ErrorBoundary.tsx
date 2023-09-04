import logout from '@/utils/logout';
import { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import Router, { useRouter } from 'next/router';
import React, { Component } from 'react';
import type { PropsWithChildren, ReactElement, ReactNode } from 'react';

import Contact from '../Contact';
import WarningModal from '../modal/WarningModal';
import Error from './Error';

type ErrorBoundaryProps = PropsWithChildren<{}>;

interface ErrorBoundaryState {
  error: Error;
}

const errorBoundaryState: ErrorBoundaryState = {
  error: null,
};

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = errorBoundaryState;
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.error(error);
    return { error };
  }

  private readonly resetState = (): void => {
    this.setState(errorBoundaryState);
  };

  private readonly setError = (error: Error): void => {
    this.setState({ error });
  };

  private readonly handleAxiosError = ({ data, status }: AxiosResponse): ReactElement => {
    let message: ReactElement;
    if (status === 403) {
      switch (data) {
        case 1012: {
          message = <p>접근 권한이 없습니다.</p>;
          break;
        }
        case 1013: {
          message = <p>멤버만 이용할 수 있는 기능이에요!</p>;
          break;
        }
      }
    } else if (status === 404 && data === 1010) {
      message = <p>신청자가 방금 해당 요청을 취소했어요🙄</p>;
    } else if (status === 503) {
      switch (data) {
        case 1007: {
          return <Contact />;
        }
        case 1008: {
          message = (
            <>
              <p>같은 시간대에</p>
              <p>다른 회의실 예약 내역이 존재해요!</p>
            </>
          );
          break;
        }
        case 1009: {
          message = (
            <>
              <p>누군가가 방금 해당 시간대를 예약했어요🙄</p>
              <p>다른 시간대를 선택해 주세요!</p>
            </>
          );
          break;
        }
      }
    }
    if (message !== undefined) {
      return (
        <WarningModal>
          <div className='text-modal text-left'>{message}</div>
        </WarningModal>
      );
    }
    logout();
    return <Error />;
  };

  private readonly handleError = (event: ErrorEvent): void => {
    this.setError(event.error);
    event.preventDefault?.();
  };

  private readonly handleRejectedPromise = (event: PromiseRejectionEvent): void => {
    event?.promise?.catch?.(this.setError);
    event.preventDefault?.();
  };

  componentDidMount(): void {
    window.addEventListener('error', this.handleError);
    window.addEventListener('unhandledrejection', this.handleRejectedPromise);
    Router.events.on('routeChangeStart', this.resetState);
  }

  componentWillUnmount(): void {
    window.removeEventListener('error', this.handleError);
    window.removeEventListener('unhandledrejection', this.handleRejectedPromise);
    Router.events.off('routeChangeStart', this.resetState);
  }

  render(): ReactNode {
    const { error } = this.state;
    if (error === null) {
      return this.props.children;
    }
    console.warn('ErrorBoundary: ', error);
    if (isAxiosError(error)) {
      return this.handleAxiosError(error.response);
    }
    return <Error />;
  }
}
