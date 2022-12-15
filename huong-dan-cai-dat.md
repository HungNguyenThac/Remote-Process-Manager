# clone project:

- https: https://github.com/HungNguyenThac/Remote-Process-Manager.git
- ssh: git@github.com:HungNguyenThac/Remote-Process-Manager.git

# truy cập thư mục dự án:

- cd Remote-Process-Manager

# cài đặt package:

- npm install

# chạy dự án:

- npm start

# trên browser truy cập địa chỉ:

- http://localhost:9527procman

# lấy danh sách ứng dụng đang chạy trên máy

- http://localhost:9527/procman/getprocess

# để kill ứng dụng:

bước 1: copy pid từ danh sách ứng dụng ở bước trên, ví dụ pid: 888
bước 2: dán pid vào sau địa chỉ: http://localhost:9527/procman/killapp
==> http://localhost:9527/procman/killapp/888
bước 3: ứng dụng bị kill
