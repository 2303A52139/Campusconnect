import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px",
            background: "#0f172a",
            color: "#fff",
          }}
        >
          <div
            style={{
              maxWidth: "560px",
              width: "100%",
              padding: "24px",
              borderRadius: "16px",
              background: "#111827",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <h2 style={{ marginTop: 0 }}>Something went wrong</h2>
            <p>The app hit an unexpected error. Try refreshing the page.</p>

            {this.state.error && (
              <pre
                style={{
                  whiteSpace: "pre-wrap",
                  background: "#0b1220",
                  padding: "12px",
                  borderRadius: "12px",
                  overflowX: "auto",
                }}
              >
                {this.state.error.toString()}
              </pre>
            )}

            <button
              onClick={this.handleReset}
              style={{
                marginTop: "16px",
                padding: "10px 16px",
                borderRadius: "10px",
                border: "none",
                background: "#2563eb",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;