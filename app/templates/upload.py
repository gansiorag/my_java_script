import os
import cgi

# Get the uploaded file from the request
form = cgi.FieldStorage()
file = form["file"]

# Get the filename and file extension
filename = os.path.basename(file.filename)
file_extension = os.path.splitext(filename)[1]

# Save the file to a directory on the server
with open(os.path.join("uploads", filename), "wb") as f:
    f.write(file.value)

print("Content-type:text/html\r\n\r\n")
print("<html>")
print("<body>")
print("<h1>File uploaded successfully!</h1>")
print("</body>")
print("</html>")
