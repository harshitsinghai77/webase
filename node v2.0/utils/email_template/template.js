module.exports = EmailTemplate = (userEmail, userToken) => {
  return `<div>
  <div>
    <div>
      <u></u>
      <div>
        <table width="100%" bgcolor="#fdfdfd">
          <tbody>
            <tr>
              <td width="600">
                <div>
                  Let's confirm your email address.
                  <div>
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="https://webaselandingpage.netlify.com/"
                              target="_blank"
                              rel="noopener"
                              ><img
                                src="https://i.ibb.co/cXMqdrq/webase-wallpaper.png"
                                alt="WeBase"
                                width="200"
                            /></a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <table width="100%">
                              <tbody>
                                <tr>
                                  <td>
                                    <h2>
                                      You're on your way!<br />
                                      Let's confirm your email address.
                                    </h2>
                                    <p>
                                      By clicking on the following link, you are
                                      confirming your email address.
                                    </p>
                                  </td>
                                </tr>
                                <tr>
                                  <td>
                                    <table
                                      width="100%"
                                      cellspacing="0"
                                      cellpadding="0"
                                    >
                                      <tbody>
                                        <tr>
                                          <td>
                                            <table
                                              cellspacing="0"
                                              cellpadding="0"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td bgcolor="#348eda">
                                                    <a
                                                      href="${process.env.REACT_ENDPOINT}/confirmation/${userToken}/${userEmail}"
                                                      target="_blank"
                                                      rel="noopener"
                                                      >Confirm Email Address</a
                                                    >
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table width="100%">
                      <tbody>
                        <tr>
                          <td>
                            <a
                              href="https://webaselandingpage.netlify.com/"
                              target="_blank"
                              rel="noopener"
                              ><img
                                src="https://i.ibb.co/cXMqdrq/webase-wallpaper.png"
                                alt="WeBase"
                                width="91"
                                height="20"
                            /></a>
                            <p>Making Deep Learning Simple</p>
                            <p>
                              &copy; WeBase Inc. Room no 248, B Block, Bennett
                              University, India
                            </p>
                            <p>
                              <a
                                href="https://medium.com/@harshitsinghai77/introducing-webase-3f765076c403"
                                target="_blank"
                                rel="noopener"
                                >Blog</a
                              >
                              <a
                                href="https://github.com/harshitsinghai77/webase"
                                target="_blank"
                                rel="noopener"
                                >GitHub</a
                              >
                              <a
                                href="https://www.youtube.com/watch?v=buU5tFiB_qQ"
                                target="_blank"
                                rel="noopener"
                                >YouTube</a
                              >
                              <a
                                href="https://webaselandingpage.netlify.com/"
                                target="_blank"
                                rel="noopener"
                                >Website</a
                              >
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        WeBase
        <a
          href="https://webaselandingpage.netlify.com/"
          target="_blank"
          rel="noopener"
          >WeBase.com</a
        >.
      </div>
    </div>
  </div>
</div>`;
};
